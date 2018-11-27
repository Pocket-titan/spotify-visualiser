import React, { Component } from 'react'
import Player from './Player'

const  Visualiser = ({ params: { access_token } }) => {
  // The name Spotify will display for your player
  let player_name = "React Visualiser :D"

  return (
    <Player
      access_token={access_token}
      name={player_name}
    >
    {
      // Pass the values to a component that will display them
      props => <Display {...props} />
    }
    </Player>
  )
}

// This is where the visualisation magic happens
const Display = ({ duration, position, features, analysis, current_track, togglePlay }) => {
  // Amount of decimals in percentage, 1 = 0 (whole numbers) e.g 35%, 10 = 1 (e.g 35.1%), 100 = 2, 1000 = 3, etc.
  let precision = 1000
  let percentage = Math.round(position/duration*100 * precision)/precision

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        transition: 'all .2ms ease',
        // Linear gradient moving from left (white) to right (black) as the song progesses
        background: `linear-gradient(
          to right,
          white 0%,
          white ${percentage}%,
          black ${percentage}%,
          black 100%
        )`
      }}
      onKeyDown={({ key }) => {
        const SPACEBAR = ' '
        if (key === SPACEBAR) {
          togglePlay()
        }
      }}
      tabIndex="0"
    />
  )
}

export default Visualiser
