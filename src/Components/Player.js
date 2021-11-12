// eslint-disable import/no-anonymous-default-export
import React, { Fragment } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { open, actionUrl } from "../helpers";

export default ({ token, playing, onAudioPlaying }) => (
  <Fragment>
    <div className="black-box" />
    {token && playing && (
      <SpotifyPlayer
        autoPlay
        callback={(state) => {
          const { isUnsupported, errorType, isPlaying } = state;
          if (isUnsupported) {
            open(
              `https://open.spotify.com/album/${playing.split(":album:")[1]}`
            );
          }
          if (errorType === "authentication_error") {
            open(actionUrl);
          }
          onAudioPlaying(isPlaying);
        }}
        token={token}
        uris={[playing]}
      />
    )}
  </Fragment>
);
