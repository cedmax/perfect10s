/* eslint-disable no-mixed-operators */
import React, { Component } from 'react'
import './App.css'
import AppLoaded from './App-loaded'
import SpotifyPlayer from 'react-spotify-web-playback'

const open = uri => (window.location.href = uri)

const authEndpoint = 'https://accounts.spotify.com/authorize' // Replace with your app's client ID, redirect URI and desired scopes
const clientId = '2de8edd3e5424748a18d6ff3a8256647'
const redirectUri = `${window.location.protocol}//${window.location.host}`
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state'
] // Get the hash of the url

const actionUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${
  redirectUri
}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`

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
    this.state = { token: '', playing: '', audioPlaying: false }
    this.onPlay = this.onPlay.bind(this)
  }
  componentDidMount () {
    let token = hash.access_token

    if (!token) {
      token = localStorage.getItem('token')
    } else {
      localStorage.setItem('token', token)
    }
    
    if (token) {
      this.setState({
        token
      })
    }
  }

  onPlay (uri) {
    this.setState({
      playing: uri
    })
  }

  render () {
    const action = !this.state.token ? () => open(actionUrl) : this.onPlay

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Pitchfork's perfect 10s</h1>
          <small>made by <a href="https://cedmax.com">cedmax</a>, vynil style via <a href="https://tympanus.net/Development/RecordPlayer/" target="_blank" rel="noopener noreferrer">tympanus</a></small>
        </header>

        <AppLoaded playing={this.state.audioPlaying && this.state.playing} action={action} />

        <div className="black-box" />

        {this.state.token &&
          this.state.playing && (
            <SpotifyPlayer
              autoPlay
              callback={(state) => {
                const { isUnsupported, errorType, isPlaying } = state;
                if (isUnsupported) {
                  open(
                    `https://open.spotify.com/album/${
                      this.state.playing.split(':album:')[1]
                    }`
                  )
                }
                if (errorType === 'authentication_error') {
                  open(actionUrl)
                }
                this.setState({
                  audioPlaying: isPlaying
                })
              }}
              token={this.state.token}
              uris={[this.state.playing]}
            />
          )}
      </div>
    )
  }
}
export default App
