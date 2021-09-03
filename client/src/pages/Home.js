import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { Button, Form } from 'react-bootstrap'

const Home = (props) => {
  const [usernameQuery, setUsernameQuery] = useState('')
  const [newUsernameQuery, setNewUsernameQuery] = useState('')
  const [newNameQuery, setNewNameQuery] = useState('')
  const { setCurrentUsername } = props

  // submit button onClick: adds new user to DB
  const postNewUser = async (e) => {
    e.preventDefault()
    try {
      await axios
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

  // from getByUsername: travels to user page based on entered username
  const sendToUserPage = () => {
    props.history.push(`/user/${usernameQuery}`)
  }

  // enter button onClick: handles axios call based on entered username
  const getByUsername = async (e) => {
    e.preventDefault()
    try {
      setCurrentUsername(usernameQuery)
      await axios.get(`${BASE_URL}/user/${usernameQuery}`)
      sendToUserPage()
    } catch (err) {
      console.log(err)
    }
  }

  // the three following functions handle input fields onChange
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
    <div className="page ">
      <header className="header-home">
        <h1>Excelsior!</h1>
      </header>
      <div className="home-page">
        <div>
          <Form className="bootstrap-form-contain" onSubmit={getByUsername}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Existing User:</Form.Label>
              <Form.Control
                type="username"
                placeholder="enter username"
                value={usernameQuery}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-button">
              Enter
            </Button>
          </Form>
        </div>
        <div>
          <Form className="bootstrap-form-contain" onSubmit={postNewUser}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your Name:</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={newNameQuery}
                onChange={handleChangeNewName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Your Username:</Form.Label>
              <Form.Control
                type="username"
                placeholder="enter new username"
                value={newUsernameQuery}
                onChange={handleChangeNewUser}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-button">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Home
