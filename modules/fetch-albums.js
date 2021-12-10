const axios = require('axios')
const download = require('image-downloader')
const fs = require('fs')

const baseUrl =
  'https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&rating_from=10.0&size=200&start='

const fetchAll = async (startPosition, results) => {
  const { data } = await axios.get(baseUrl + startPosition)

  if (data.results && data.results.list && data.results.list.length) {
    results = [...results, ...data.results.list]
    return fetchAll(startPosition + 200, results)
  } else {
    const data = results.map(
      ({ tombstone: { albums }, seoDescription, url }) => {
        const album = albums.find(
          ({ rating: { rating, bnr } }) => rating === '10.0' && bnr === false
        )
        
        if (!album) return;

        const {
          id,
          album: {
            artists,
            display_name: title,
            photos: { tout: { sizes: { standard: photo } } },
            labels
          }
        } = album
          
        return {
          title,
          slug: id,
          photo,
          review: seoDescription,
          artists: artists.map(({ display_name }) => display_name),
          labels: labels.map(({ display_name }) => display_name),
          url: 'https://pitchfork.com' + url
        }
      }
    ).filter(a => !!a)

    await Promise.all(
      data
        .map(({ photo, slug }) => {
          const dest = `${__dirname}/../public/covers/${slug}.${photo
            .split('.')
            .pop()}`
          if (!fs.existsSync(dest)) {
            let options = {
              url: photo,
              dest
            }
            return download.image(options)
          }

          return null
        })
        .filter(i => i)
    )

    fs.writeFileSync(
      __dirname + '/../src/data.json',
      JSON.stringify(
        data.map(({ photo, ...item }) => ({
          ...item,
          photo: `covers/${item.slug}.${photo.split('.').pop()}`
        })),
        null,
        2
      ),
      'UTF-8'
    )
  }
}

fetchAll(0, [])
