import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'

const Home = (props) => {
  const [usernameQuery, setUsernameQuery] = useState('')
  const [newUsernameQuery, setNewUsernameQuery] = useState('')
  const { currentUsername, setCurrentUsername } = props
  return (
    <div className="page">
      <Nav />
      <div>
        <h2>Enter Username</h2>
      </div>
    </div>
  )
}

export default Home
