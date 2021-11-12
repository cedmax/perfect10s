import React, { useState, useCallback, memo } from "react";

export default memo(({ tracks }) => {
  const [isExpanded, setExpanded] = useState();
  const toggleExpand = useCallback(() => {
    setExpanded((isExpanded) => !isExpanded);
  }, [setExpanded]);

  return (
    <span className="tracks">
      {tracks &&
        (isExpanded ? (
          <ol onClick={toggleExpand}>
            {tracks.map((track) => (
              <li key={track.name}>
                {track.track_number}. {track.name}
              </li>
            ))}
          </ol>
        ) : (
          <span onClick={toggleExpand}>
            {tracks.length} <small>tracks</small>
          </span>
        ))}
    </span>
  );
});
