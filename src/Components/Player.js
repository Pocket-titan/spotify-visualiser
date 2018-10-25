import React, { Component } from 'react'

class Player extends Component {
  componentDidMount = () => {
    window.onSpotifyWebPlaybackSDKReady = this.onPlayerReady
    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true
    document.body.appendChild(script)
  }

  onPlayerReady = () => {
    console.log('ready!')
    const player = new window.Spotify.Player({
      name: 'React Visualiser :D',
      getOAuthToken: cb => { cb(this.props.access_token) }
    })

    this.props.createRef(player)

    player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!')
      }
    })

    const { onStateChanged = false } = this.props
    if (onStateChanged) {
      player.addListener('player_state_changed', onStateChanged)
    }
  }
  
  render() {
    return (
      <noscript/>
    )
  }
}

export default Player
