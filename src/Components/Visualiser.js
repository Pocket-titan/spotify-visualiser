import React, { Component } from 'react'
import Player from './Player'

class Visualiser extends Component {
  state = {
    duration: null,
    position: null,
    current_track: null,
    features: null,
    paused: true,
  }

  togglePlay = () => {
    if (!this.player) {
      return
    }

    this.player.togglePlay().then(() => {
      console.log('Toggled playback!')
    })
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

  getAudioFeatures = async (id) => {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.params.access_token}`
      }
    })
    const features = await response.json()
    this.setState({ features })
  }

  onStateChanged = ({ duration, position, paused, track_window: { current_track }}) => {
    if ((!paused && this.state.paused) || (paused && !this.state.paused)) {
      this.toggleTimer()
    }

    // on a new song, or if we have no features stored yet
    if (
      !this.state.features || current_track.name !== this.state.current_track.name
    ) {
      this.getAudioFeatures(current_track.id)
    }

    this.setState({
      duration,
      position,
      current_track,
      paused,
    })
  }

  render() {
    const { access_token } = this.props.params
    const { duration, position, current_track, features } = this.state
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Player
          access_token={access_token}
          createRef={(player) => this.player = player}
          onStateChanged={(state) => this.onStateChanged(state)}
        />
        <div style={{ height: 150, width: 300, display: 'flex', flexDirection: 'column' }}>
          <span> Track features </span>
          {
            features && (
              Object.entries(features).map(([key, value]) =>
                <span>
                  {`${key}=${value}`}
                </span>
              )
            )
          }
        </div>
        <div style={{ height: 100, width: 150, flexDirection: 'column', display: 'flex' }}>
          <span> Track info </span>
          <span>
            {`Duration ${duration}`}
          </span>
          <span>
            {`Position ${position}`}
          </span>
          <span>
            {`Progress ${Math.round(position/duration * 100 * 10)/10}%`}
          </span>
          <span>
            {`Current track ${current_track ? current_track.name : 'none'}`}
            {
              current_track && current_track.album.images.length > 0 && (
                <img
                  alt="Album cover"
                  src={current_track.album.images[0].url}
                  style={{
                    width: current_track.album.images[0].width/2,
                    height: current_track.album.images[0].height/2,
                  }}
                />
              )
            }
          </span>
        </div>
        <div
          style={{
            padding: 15,
            margin: 15,
            backgroundColor: 'white',
            color: 'black',
            cursor: 'pointer',
          }}
          onClick={this.togglePlay}
        >
          Play / Pause
        </div>
      </div>
    )
  }
}

export default Visualiser
