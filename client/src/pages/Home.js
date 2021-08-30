import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import { BASE_URL } from '../globals'

const Home = (props) => {
  const [usernameQuery, setUsernameQuery] = useState('')
  const [newUsernameQuery, setNewUsernameQuery] = useState('')
  const [newNameQuery, setNewNameQuery] = useState('')
  const { currentUsername, setCurrentUsername } = props

  const postNewUser = async (e) => {
    e.preventDefault()
    console.log('submit')
    try {
      const res = await axios
        .post(`${BASE_URL}/user`, {
          username: newUsernameQuery,
          name: newNameQuery
        })
        .then(function (response) {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      setUsernameQuery(newUsernameQuery)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeNewUser = (event) => {
    setNewUsernameQuery(event.target.value)
  }
  const handleChangeNewName = (event) => {
    setNewNameQuery(event.target.value)
  }
  return (
    <div className="page">
      <Nav />
      <div>
        <div className="add-new-user">
          <h2>Enter a username to create an account:</h2>
          <div className="new-user-text">
            <input
              type="text"
              placeholder="enter your name"
              value={newNameQuery}
              onChange={handleChangeNewName}
            />
            <TextInput
              onSubmit={postNewUser}
              name="Submit"
              placeholder="enter new username"
              value={newUsernameQuery}
              onChange={handleChangeNewUser}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
