import React, { useCallback, memo } from "react";
import Vinyl from "./Vinyl";
import Tracks from "./Tracks";

const Meta = memo(({ album }) => (
  <div className="meta">
    <h1>{album.title}</h1>
    <h2>{album.artists[0]}</h2>
    <span>
      <a href={album.url} target="_blank" rel="noreferrer noopener">
        review
      </a>
    </span>
  </div>
));

export default ({ album, action, isPlaying, currentSong }) => {
  const playAction = useCallback(() => {
    action({ palette: album.palette, url: album.spotify });
  }, [action, album.palette, album.spotify]);

  return (
    <li className={`${isPlaying ? "playing" : ""}${album.tracks[0] ? "" : " disabled"}`} data-year={album.year}>
      <Vinyl
        img={album.photo}
        title={album.title}
        playAction={album.spotify ? playAction : null}
      />
      <Meta album={album} />
      <Tracks currentSong={currentSong} tracks={album.tracks} />
    </li>
  );
};
