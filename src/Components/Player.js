import React, { Component } from 'react'

class Player extends Component {
  state = {
    current_track: null,
    duration: null,
    position: null,
    features: null,
    analysis: null,
    paused: true,
  }

  toggleTimer = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      return
    }

    this.timer = setInterval(() => {
      this.setState(({ position }) => {
        return {
          position: position + 30,
        }
      })
    }, 30)
  }

  togglePlay = () => {
    if (!this.player) {
      return
    }

    this.player.togglePlay()
  }

  componentDidMount = () => {
    window.onSpotifyWebPlaybackSDKReady = this.onPlayerReady
    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true
    document.body.appendChild(script)
  }

  onPlayerReady = () => {
    console.log('Player ready!')
    const player = new window.Spotify.Player({
      name: this.props.name || "React Visualiser",
      getOAuthToken: cb => { cb(this.props.access_token) }
    })

    this.player = player

    player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!')
      }
    })

    player.addListener('player_state_changed', this.onStateChanged)
  }

  onStateChanged = ({ duration, position, paused, track_window: { current_track }}) => {
     // if we paused, stop the timer, if we unpaused, start the timer (again)
     if ((!paused && this.state.paused) || (paused && !this.state.paused)) {
      this.toggleTimer()
    }

    // on a new song, or no features / analysis yet
    if (!this.state.features || !this.state.analysis || current_track.name !== this.state.current_track.name) {
      this.getAudioFeatures(current_track.id)
      this.getAudioAnalysis(current_track.id)
    }

    this.setState({
      current_track,
      duration,
      position,
      paused,
    })
  }

  getAudioAnalysis = async (id) => {
    if (this.analysisRequest) {
      return
    }
  
    this.analysisRequest = true

    const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.access_token}`
      }
    })
    const analysis = await response.json()
    console.log('analysis', analysis)
    this.setState({
      analysis
    }, () => this.analysisRequest = false)
  }

  getAudioFeatures = async (id) => {
    if (this.featureRequest) {
      return
    }
  
    this.featureRequest = true

    const response = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.access_token}`
      }
    })
    const features = await response.json()
    this.setState({
      features
    }, () => this.featureRequest = false)
  }
  
  render() {
    const { duration, position, current_track, features, analysis } = this.state
    const { children } = this.props
    return (
      children({
        duration,
        position,
        current_track,
        features,
        analysis,
        togglePlay: this.togglePlay,
      })
    )
  }
}

export default Player
