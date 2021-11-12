import React, { useCallback, memo } from 'react'
import Vinyl from './Vinyl'
import Tracks from './Tracks';

const Meta = memo(({album}) => (
  <div className="meta">
    <h1>{album.title}</h1>
    <h2>{album.artists[0]}</h2>
    <span>
      <a href={album.url} target="_blank" rel="noreferrer noopener">
        review
      </a>
    </span>
  </div>
))

export default ({ album, action, isPlaying }) => {
  const playAction = useCallback(
    () => {
      action(album.spotify)
    },
    [action, album.spotify]
  )

  return (
    <li className={`${isPlaying ? 'playing' : ''}`} data-year={album.year}>
      <Vinyl
        img={album.photo}
        title={album.title}
        playAction={album.spotify ? playAction : null}
      />
      <Meta album={album} />
      <Tracks tracks={album.tracks} />
    </li>
  )
}
