import React, { useState, useCallback } from "react";
import Album from "./Album";
import data from "../new-data.json";

const sorted = data.sort(({ year: a = 0 }, { year: b = 0 }) => {
  return a - b;
});

const getColor = (bk, index) => {
  if (typeof index ==='undefined' || !bk) return `rgb(255, 255, 255)`
  return `rgb(${bk[index].join()}`
}

function App({ action, playing }) {
  const [bk, setBackground] = useState();
  const onPlay = useCallback(
    ({ palette, url }) => {
      setBackground(palette);
      action(url)
    },
    [action]
  );

  return (
    <ul
      style={{
        "--bk-internal": getColor(bk, 5),
        "--bk-middle-inner": getColor(bk, 2),
        "--bk-middle-outer": getColor(bk, 0),
        "--bk-middle-external": getColor(bk, 1),
        "--bk-external": getColor(bk, 4),
        "--bk-lines": 'black',
      }}
    >
      {sorted.map((album) => (
        <Album
          action={onPlay}
          isPlaying={playing === album.spotify}
          key={album.slug}
          album={album}
        />
      ))}
    </ul>
  );
}

export default App;
