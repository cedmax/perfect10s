import React, { useState, useCallback } from "react";
import Album from "./Album";
import data from "../new-data.json";

const sorted = data.sort(({ year: a = 0 }, { year: b = 0 }) => {
  return a - b;
});

function App({ action, playing }) {
  const [background, setBackground] = useState();
  const onPlay = useCallback(
    ({ img, url }) => {
      setBackground(img);

      //action(url)
    },
    [action]
  );

  console.log(background);

  return (
    <ul
      style={{
        "--background": `url('${background}')`,
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
