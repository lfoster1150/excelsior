import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'
import { BASE_URL } from '../globals'
import { Button, Container, Row, Form } from 'react-bootstrap'

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
    props.history.push(`/user/${usernameQuery}`)
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
      <Form className="bootstrap-contain" onSubmit={postNewUser}>
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
          <Form.Label>New Username:</Form.Label>
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

      <Form className="bootstrap-contain" onSubmit={getByUsername}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>New Username:</Form.Label>
          <Form.Control
            type="username"
            placeholder="enter new username"
            value={usernameQuery}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Home
