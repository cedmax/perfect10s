import React, { Component } from 'react'
import './App.css'
import AppLoaded from './App-loaded'
import SpotifyPlayer from 'react-spotify-web-playback'

const authEndpoint = 'https://accounts.spotify.com/authorize' // Replace with your app's client ID, redirect URI and desired scopes
const clientId = '2de8edd3e5424748a18d6ff3a8256647'
const redirectUri = 'http://localhost:3000'
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state'
] // Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
    }
    return initial
  }, {})
window.location.hash = ''
class App extends Component {
  constructor (props) {
    super(props)
    this.state = { token: '', playing: '' }
    this.onPlay = this.onPlay.bind(this)
  }
  componentDidMount () {
    // Set token
    let _token = hash.access_token
    if (_token) {
      // Set token
      this.setState({
        token: _token
      })
    }
  }

  onPlay (uri) {
    this.setState({
      playing: uri
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Pitchfork's perfect 10s</h1>
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${
                redirectUri
              }&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              <img className="connect" src="/spotify.png" alt="connect with Spotify" />
            </a>
          )}
        </header>
        {this.state.token && (
          <AppLoaded onPlay={this.onPlay} token={this.state.token} />
        )}
        {this.state.token &&
          this.state.playing && (
            <SpotifyPlayer
              autoPlay
              token={this.state.token}
              uris={[this.state.playing]}
            />
          ) || <div className="black-box"/>}
      </div>
    )
  }
}
export default App
