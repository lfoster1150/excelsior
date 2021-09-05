import React, { useState } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import User from './pages/User'
import Stack from './pages/Stack'
import ComicDetails from './pages/ComicDetails'
import MarvelComicDetails from './pages/MarvelComicDetails'
import { Route, Switch } from 'react-router-dom'
import MarvelSearch from './pages/MarvelSearch'
require('dotenv').config()

function App() {
  const [currentUsername, setCurrentUsername] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => (
            <Home
              {...props}
              currentUsername={currentUsername}
              setCurrentUsername={setCurrentUsername}
            />
          )}
        />
        <Route
          path="/user/:username/stack/:id/comic/:comic_id"
          component={(props) => (
            <ComicDetails
              {...props}
              currentUsername={currentUsername}
              setCurrentUsername={setCurrentUsername}
            />
          )}
        />
        <Route
          path="/user/:username/stack/:id"
          component={(props) => (
            <Stack
              {...props}
              currentUsername={currentUsername}
              setCurrentUsername={setCurrentUsername}
            />
          )}
        />
        <Route
          path="/user/:username/marvel/:api_id"
          component={(props) => (
            <MarvelComicDetails
              {...props}
              currentSearch={currentSearch}
              setCurrentSearch={setCurrentSearch}
            />
          )}
        />
        <Route
          path="/user/:username/marvel"
          component={(props) => (
            <MarvelSearch
              {...props}
              currentUsername={currentUsername}
              currentSearch={currentSearch}
              setCurrentSearch={setCurrentSearch}
            />
          )}
        />
        <Route
          path="/user/:username"
          component={(props) => (
            <User
              {...props}
              currentUsername={currentUsername}
              setCurrentUsername={setCurrentUsername}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default App
