const {Select, Input} = require('enquirer')

module.exports = {
  findRightAlbum: (albums, title, artist) =>
    albums.find(
      item =>
        item.name.toLowerCase() === title.toLowerCase() &&
        item.artists[0].name.toLowerCase() === artist.toLowerCase()
    ),
  selectAlbumFromList: (albums, title, artist) =>
    new Select({
      name: 'value',
      message: `Couldn't match "${title}" by "${artist}", please select one`,
      choices: [...albums.map(item => ({
        message: `${item.name} by ${item.artists[0].name} – ${item.release_date}`,
        value: item
      })), {message: 'none of these', value: {}}],
      format: (item) => item.name && `${item.name} by ${item.artists[0].name}`
    }).run(),
  searchAgain: (title, artist) => new Input({
    message: `Couldn't find anything for "${title}" by "${
      artist
    }", please enter a new search query`
  }).run()
}
