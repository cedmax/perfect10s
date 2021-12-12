const Vibrant = require('node-vibrant')
const getPalette = async file => new Vibrant.from(file).getPalette()

module.exports = async imgPath => {
  const colors = await getPalette(imgPath)

  return Object.values(colors).map(({ _rgb }) =>
    _rgb.map(e => Math.round(e))
  )
}
