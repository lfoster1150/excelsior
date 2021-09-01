import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'
import { BASE_URL } from '../globals'

const Home = (props) => {
  const [usernameQuery, setUsernameQuery] = useState('')
  const [newUsernameQuery, setNewUsernameQuery] = useState('')
  const [newNameQuery, setNewNameQuery] = useState('')
  const { currentUsername, setCurrentUsername } = props

  const postNewUser = async (e) => {
    e.preventDefault()
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

  const sendToUserPage = () => {
    props.history.push(`/user/${currentUsername}`)
  }

  const getByUsername = async (e) => {
    e.preventDefault()
    try {
      setCurrentUsername(usernameQuery)
      const res = await axios.get(`${BASE_URL}/user/${usernameQuery}`)
      sendToUserPage()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (event) => {
    setUsernameQuery(event.target.value)
  }
  const handleChangeNewUser = (event) => {
    setNewUsernameQuery(event.target.value)
  }
  const handleChangeNewName = (event) => {
    setNewNameQuery(event.target.value)
  }
  return (
    <div className="page">
      <div>
        <div className="existing-user">
          <h2>Enter your username to see your collections:</h2>
          <TextInputWithButton
            onSubmit={getByUsername}
            name="Submit"
            text="Submit"
            placeholder="enter new username"
            value={usernameQuery}
            onChange={handleChange}
          />
        </div>
        <div className="add-new-user">
          <h2>Enter a username to create an account:</h2>
          <div className="new-user">
            <div className="input-text">
              <p>Your Name: </p>
              <TextInput
                placeholder="enter your name"
                value={newNameQuery}
                onChange={handleChangeNewName}
              />
            </div>
            <div className="input-text">
              <p>New Username: </p>

              <TextInputWithButton
                onSubmit={postNewUser}
                name="Submit"
                text="Submit"
                placeholder="enter new username"
                value={newUsernameQuery}
                onChange={handleChangeNewUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
