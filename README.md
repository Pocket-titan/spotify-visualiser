## About

React boilerplate for building a music visualiser with the Spotify Web/Playback api. Handles all the callback and token shenanigans, and provides the audio features and analysis per song so you can focus on the important stuff.

## Usage

1. Clone the repo && `npm install`
2. Edit the Display component in `/Components/Visualiser.js` according to your preferred aesthetics
3. `npm start`
4. Click the `Login` button now showing on `localhost:3000`
5. Go to your Spotify desktop app, click `Connect to a Device` and select your player
6. ???
7. Profit

`/Components/Visualiser.js`
```javascript
const Visualiser = ({ params: { access_token } }) => {
  // The name Spotify will display for your player
  let player_name = "React Visualiser :D"

  return (
    <Player
      access_token={access_token}
      name={player_name}
    >
    {
      ({ position, duration, features, analysis, current_track, togglePlay }) => {
        /// ... do something fancy!
      }
    }
    </Player>
  )
}
```

### Types

```
position :: Float
duration :: Float
togglePlay :: () -> ()
features :: {
  key :: Number,
  ...
  see [spotify docs - Get Audio Features](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features)
}
analysis :: {
  ...
  see [spotify docs - Get Audio Analysis](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/)
}
current_track :: {
  ...
  see [spotify docs - Get a Track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/)
}
```
