/* eslint-disable no-mixed-operators */
import React, { Component } from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Player from "./Components/Player";
import { open, auth, actionUrl } from "./helpers";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "", playing: "", audioPlaying: false };
    this.onPlay = this.onPlay.bind(this);
    this.onAudio = this.onAudio.bind(this);
  }

  componentDidMount() {
    let token = auth().access_token;

    if (!token) {
      const now = new Date();
      const tokenSetTime = new Date(Number(localStorage.getItem("token-set-time") || 0));
      const isValid = (tokenSetTime - now) < 3.6e+6 // the token should be less than 1hr older
      token = isValid && localStorage.getItem("token");
    } else {
      localStorage.setItem("token-set-time", (new Date()).getTime());
      localStorage.setItem("token", token);
    }

    if (token) {
      this.setState({
        token,
      });
    }
  }

  onPlay(uri) {
    if (!this.state.token) {
      open(actionUrl);
    } else {
      this.setState({
        playing: uri,
      });
    }
  }

  onAudio(isPlaying) {
    this.setState({
      audioPlaying: isPlaying,
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Body
          playing={this.state.audioPlaying && this.state.playing}
          currentSong={this.state.audioPlaying}
          action={this.onPlay}
        />
        <Player
          key={this.state.playing}
          onAudioPlaying={this.onAudio}
          token={this.state.token}
          playing={this.state.playing}
        />
      </div>
    );
  }
}
export default App;
