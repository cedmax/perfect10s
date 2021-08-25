require('dotenv').config()
const Cache = require('sync-disk-cache')
const SpotifyWebApi = require('spotify-web-api-node')
const { findRightAlbum, selectAlbumFromList, searchAgain } = require('./inputs')
const cache = new Cache('spotify-cache')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT,
  clientSecret: process.env.SECRET
})

const withCache = func => async (key, ...args) => {
  if (cache.has(key)) {
    const cachedItem = cache.get(key).value
    return JSON.parse(cachedItem)
  } else {
    console.log('cache miss', key)
    await new Promise(resolve => setTimeout(resolve, 500))
    const result = await func(key, ...args)
    cache.set(key, JSON.stringify(result))
    return result
  }
}

const searchAlbums = async q => {
  const { body: { albums: { items } } } = await spotifyApi.searchAlbums(q, {
    market: 'GB'
  })
  return items || []
}

module.exports = {
  setup: async () => {
    const { body: { access_token } } = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(access_token)
  },
  searchAlbums: withCache(async (title, artist) => {
    let albums = await searchAlbums(`album:"${title}" artist:"${artist}"`)
    let newInput

    while (!albums.length && newInput !== '') {
      newInput = await searchAgain(title, artist)
      if (newInput) {
        albums = await searchAlbums(newInput)
      }
    }

    if (albums.length) {
      let album
      while (!album) {
        album = await findRightAlbum(albums, title, artist)
        if (!album) {
          album = await selectAlbumFromList(albums, title, artist)
        }
      }
      return album
    }
    return {}
  }),
  getAlbumTracks: withCache(async id => {
    const { body: { tracks: { items } } } = await spotifyApi.getAlbum(id)
    return items || []
  }),
  getTrack: withCache(async id => {
    const track = await spotifyApi.getTrack(id)
    return track || {}
  })
}
