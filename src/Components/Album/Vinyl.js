import React, { Fragment, memo } from "react";
export default memo(({ img, title, playAction }) => (
  <Fragment>
    <div className="background" style={{ backgroundImage: `url('${img}')` }} />
    <div className="img">
      <div
        className="lp"
        style={{
          backgroundImage: `url('${img}')`,
        }}
      />

      <img alt={title} src={`${img}`} />
      {playAction && (
        <button className="play-button" onClick={playAction} target="_blank">
          <svg
            className="icon"
            dangerouslySetInnerHTML={{
              __html: '<use xlink:href="#icon-play" />',
            }}
          />
        </button>
      )}
    </div>
  </Fragment>
));
