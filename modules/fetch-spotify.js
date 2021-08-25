const data = require('../src/data.json')
const spotify = require('./lib/spotify.js')
const fs = require('fs')

const manualFixes = {
  "3 Feet High and Rising": {year: 1989, tracks: {length: 24 }},
  "The Beatles": {year: 1968},
  "Optimo EP": {year: 1983, tracks: {length: 4}},
  "The Ascension": {year: 2003},
  "No Thanks!: The 70s Punk Rebellion": {year: 2003, tracks: {length: 100}}
}

const newData = []
;(async () => {
  const getTracks = await spotify()
  let counter = 1
  for (const album of data) {
    const { artists: [artist], title } = album

    const results = await getTracks(artist, title, counter++, data.length)
    newData.push({
      ...album,
      ...results,
      ...manualFixes[title]
    })

    fs.writeFileSync(
      __dirname + '/../src/new-data.json',
      JSON.stringify(
        newData,
        null,
        2
      ),
      'UTF-8'
    )
  }
})()
