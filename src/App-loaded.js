import React from 'react'
import data from './new-data.json'
import './App.css'

const sorted = data.sort(({ year: a = 0 }, { year: b = 0 }) => {
  return a - b
})

function App ({ action, playing }) {
  return (
    <ul>
      {sorted.map(album => (
        <li
          className={`${playing === album.spotify ? 'playing' : ''}`}
          key={album.slug}
          data-year={album.year}
        >
          <div
            className="background"
            style={{ backgroundImage: `url('${album.photo}')` }}
          />
          <div className="img">
            <div className="lp" style={{
              backgroundImage: `url('${album.photo}')`
            }} />

            <img alt={album.title} src={`${album.photo}`} />
            {album.spotify && (
              <button
                className="play-button"
                onClick={() => action(album.spotify)}
                target="_blank"
              >
                <svg
                  className="icon"
                  dangerouslySetInnerHTML={{
                    __html: '<use xlink:href="#icon-play" />'
                  }}
                />
              </button>
            )}
          </div>
          <div className="meta">
            <h1>{album.title}</h1>
            <h2>{album.artists[0]}</h2>
            <span>
              <a href={album.url} target="_blank" rel="noreferrer noopener">
                review
              </a>
            </span>
          </div>
          <span className="tracks">
            {album.tracks && album.tracks.length} <small>tracks</small>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default App
