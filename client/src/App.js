import React, { useState, useEffect } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import User from './pages/User'
import Stack from './pages/Stack'
import ComicDetails from './pages/ComicDetails'
import MarvelComicDetails from './pages/MarvelComicDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { CheckSession } from './services/Auth'
import { Route, Switch } from 'react-router-dom'
import MarvelSearch from './pages/MarvelSearch'
require('dotenv').config()

function App() {
  const [currentUsername, setCurrentUsername] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const checkToken = async () => {
    //If a token exists, sends token to localstorage to persist logged in user
    const session = await CheckSession()
    setUser(session)
    toggleAuthenticated(true)
  }
  // log out
  const handleLogOut = () => {
    //Reset all auth related state and clear localstorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

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
              authenticated={authenticated}
              user={user}
              handleLogOut={handleLogOut}
              setUser={setUser}
              toggleAuthenticated={toggleAuthenticated}
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
        {user && authenticated && (
          <ProtectedRoute
            authenticated={authenticated}
            user={user}
            path="/marvel"
            component={(props) => (
              <MarvelSearch
                {...props} 
                authenticated={authenticated} 
                user={user}
                handleLogOut={handleLogOut}
                currentSearch={currentSearch}
                setCurrentSearch={setCurrentSearch}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                
              />
            )}
          />
        )}
        {user && authenticated && (
          <ProtectedRoute
            authenticated={authenticated}
            user={user}
            path="/user/:username"
            component={(props) => (
              <User {...props} authenticated={authenticated} handleLogOut={handleLogOut} user={user} />
            )}
          />
        )}
      </Switch>
    </div>
  )
}

export default App
