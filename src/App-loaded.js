import React from 'react'
import data from './new-data.json'
import './App.css'

const sorted = data.sort(({year: a = 0}, {year: b = 0}) => {
  return a - b
})

function App ({token, onPlay}) {

  return (
    <ul>
      {sorted.map(album => (
        <li key={album.slug} data-year={album.year}>
          <div
            className="background"
            style={{ backgroundImage: `url('${album.photo}')` }}
          />
          <img alt={album.title} src={`${album.photo}`} />
          <div className="meta">
            <h1>{album.title}</h1>
            <h2>{album.artists[0]}</h2>  
            <span>
              <a href={album.url} target="_blank" rel="noreferrer noopener">review</a>
              {album.spotify && <a onClick={() => onPlay(album.spotify)} target="_blank" rel="noreferrer noopener">play</a>}
            </span>
          </div>
          <span className="tracks">{album.tracks && album.tracks.length} <small>tracks</small></span>
        </li>
      ))}
    </ul>
    
  )
}

export default App
