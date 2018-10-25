import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './App.css'
import queryString from 'query-string'

// Components
import Error from './Components/Error'
import Login from './Components/Login'
import Visualiser from './Components/Visualiser'

const HandleCallback = ({ location: { hash, search } }) => {
  const params = queryString.parse(hash.length > 0 ? hash : search)
  return (
    !params.error
      ? <Visualiser params={params} />
      : <Error params={params}/>
  )
}

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/callback" component={HandleCallback}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
