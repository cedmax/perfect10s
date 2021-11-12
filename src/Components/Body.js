import React from 'react'
import Album from './Album'
import data from '../new-data.json'

const sorted = data.sort(({ year: a = 0 }, { year: b = 0 }) => {
  return a - b
})

function App ({ action, playing }) {
  return (
    <ul>
      {sorted.map(album => (
        <Album action={action} isPlaying={playing===album.spotify} key={album.slug} album={album} />
      ))}
    </ul>
  )
}

export default App
