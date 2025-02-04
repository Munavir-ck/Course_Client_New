import React from 'react'
import ReactPlayer from 'react-player';

function ReactVideoPlayer() {
  return (
    <div>
       <ReactPlayer
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        controls={true}
        playing={true}
        loop={true}
        volume={0.5}
        width="100%"
        height="auto"
      />
    </div>
  )
}

export default ReactVideoPlayer
