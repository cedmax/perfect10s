const {
  searchAlbums,
  setup,
  getAlbumTracks,
  getTrack
} = require('./spotify-api')

module.exports = async () => {
  await setup()

  return async (artist, title, counter, total) => {
    try {
      console.log(`${counter}/${total}`)
      const album = await searchAlbums(title, artist)
      if (!album.id) return {}

      const tracks = await getAlbumTracks(album.id)
      const result = await Promise.all(tracks.map(item => getTrack(item.id)))

      const orderedTracks = result.sort(
        (a, b) => a.body.track_number - b.body.track_number
      )

      let year = album.release_date
      if (year.includes('-')) {
        year = year.split('-')[0]
      }
      year = parseInt(year, 10)

      return {
        year,
        spotify: album.uri,
        tracks: orderedTracks.map(
          ({ body: { name, popularity, preview_url, track_number, id } }) => ({
            name,
            popularity,
            preview_url,
            track_number,
            id
          })
        )
      }
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  }
}
