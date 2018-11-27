import React, { Component } from 'react'

const generate_random_string = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return [...Array(10).keys()]
    .map(i => chars[Math.round(Math.random()*(chars.length - 1))])
    .join('')
}

const stringify = () => {
  const base_url = '//accounts.spotify.com/authorize?'
  const scopes = [
    'streaming',
    'user-read-birthdate',
    'user-read-currently-playing',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
  ]
  const options = {
    client_id: '4771d709fdf74e6aa8b9c289e02f37b7',
    response_type: 'token',
    redirect_uri: 'http://localhost:3000/callback',
    state: generate_random_string(),
    scope: scopes.join(' '),
  }

  return (
    base_url + Object
      .entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  )
}

class Login extends Component {
  render() {
    return (
      <div>
        <a href={stringify()} className="login-button">
          Login with spotify
        </a>
      </div>
    )
  }
}

export default Login