import React, { Component } from 'react'

class Error extends Component {
  componentDidMount = () => {
    const { params } = this.props
    console.log('params', params)
  }
  
  render() {
    return (
      <div>
        Oh no :(
      </div>
    )
  }
}

export default Error
