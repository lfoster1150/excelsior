import React, { useState } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import User from './pages/User'
import { Route, Switch } from 'react-router-dom'

function App() {
  const [currentUsername, setCurrentUsername] = useState('')
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
