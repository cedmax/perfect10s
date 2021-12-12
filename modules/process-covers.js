const data = require('../src/new-data.json')
const getPalette = require('./lib/palette.js')
const fs = require('fs')

;(async () => {
  const newData = []
  for (const album of data) {
    const { photo } = album
    const palette = await getPalette(__dirname+'/../public/'+photo)
    newData.push({
      ...album,
      palette
    })
  }

  fs.writeFileSync(
    __dirname + '/../src/new-data.json',
    JSON.stringify(
      newData,
      null,
      2
    ),
    'UTF-8'
  )
})()
