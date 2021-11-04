import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { SignInUser, RegisterUser } from '../services/Auth'

const Home = (props) => {
  const [newFormValues, setNewFormValues] = useState({ username: '', name: '', password: '' })
  const [existingFormValues, setExistingFormValues] = useState({ username: '', password: '' })
  const { setUser, toggleAuthenticated } = props

  // submit button onClick: adds new user to DB
  const postNewUser = async (e) => {
    e.preventDefault()
    await RegisterUser(newFormValues)
    setExistingFormValues({ username: newFormValues.username, password: '' })
  }

  // from handleSubmit: travels to user page based on entered username
  const sendToUserPage = () => {
    props.history.push(`/user/${existingFormValues.username}`)
  }

  // enter button onClick: handles axios call based on entered username
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(existingFormValues)
    setExistingFormValues({ username: '', password: '' })
    setUser(payload)
    toggleAuthenticated(true)
    sendToUserPage()
  }

  // the three following functions handle input fields onChange
  const handleNewChange = (e) => {
    setNewFormValues({ ...newFormValues, [e.target.name]: e.target.value })
  }
  const handleExistingChange = (e) => {
    setExistingFormValues({ ...existingFormValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="page ">
      <header className="header-home">
        <h1>Excelsior!</h1>
      </header>
      <div className="home-page">
        <div>
          <Form className="bootstrap-form-contain" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Existing Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="enter username"
                value={existingFormValues.name}
                onChange={handleExistingChange}
                />
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="enter password"
                value={existingFormValues.password}
                onChange={handleExistingChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-button">
              Enter
            </Button>
          </Form>
        </div>
        <div>
          <Form className="bootstrap-form-contain" onSubmit={postNewUser}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>New Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="enter new username"
                value={newFormValues.username}
                onChange={handleNewChange}
              />
              <Form.Label>Your Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="enter name"
                value={newFormValues.name}
                onChange={handleNewChange}
              />
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="enter password"
                value={newFormValues.password}
                onChange={handleNewChange}
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
