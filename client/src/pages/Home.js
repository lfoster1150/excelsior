import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GetHomeQuery, SetHomeQuery } from '../store/actions/HomeActions'

const mapStateToProps = ({ homeState }) => {
  return { homeState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuery: () => dispatch(GetHomeQuery()),
    setQuery: (query) => dispatch(SetHomeQuery(query))
  }
}

const Home = (props) => {
  // const [usernameQuery, setUsernameQuery] = useState('')
  // const [newUsernameQuery, setNewUsernameQuery] = useState('')
  // const [newNameQuery, setNewNameQuery] = useState('')

  const { setCurrentUsername } = props

  // submit button onClick: adds new user to DB
  const postNewUser = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(`${BASE_URL}/user`, {
          username: props.homeState.query.newUsername,
          name: props.homeState.query.newName
        })
        .then(function (response) {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      props.setQuery({
        [props.props.homeState.query.username]:
          props.homeState.query.newUsername
      })
    } catch (err) {
      console.log(err)
    }
  }

  // from getByUsername: travels to user page based on entered username
  const sendToUserPage = () => {
    props.history.push(`/user/${props.homeState.query.username}`)
  }

  // enter button onClick: handles axios call based on entered username
  const getByUsername = async (e) => {
    e.preventDefault()
    try {
      setCurrentUsername(props.homeState.query.username)
      await axios.get(`${BASE_URL}/user/${props.homeState.query.username}`)
      sendToUserPage()
    } catch (err) {
      console.log(err)
    }
  }

  // the three following functions handle input fields onChange
  const handleChange = (e) => {
    props.setQuery({
      ...props.homeState.query,
      [e.target.name]: e.target.value
    })
  }
  // const handleChange = (event) => {
  //   setUsernameQuery(event.target.value)
  // }
  // const handleChangeNewUser = (event) => {
  //   setNewUsernameQuery(event.target.value)
  // }
  // const handleChangeNewName = (event) => {
  //   setNewNameQuery(event.target.value)
  // }
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
                name="username"
                placeholder="enter username"
                value={props.homeState.query.username}
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
                name="newName"
                placeholder="Enter name"
                value={props.homeState.query.newName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Your Username:</Form.Label>
              <Form.Control
                type="username"
                name="newUsername"
                placeholder="enter new username"
                value={props.homeState.query.newUsername}
                onChange={handleChange}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)
