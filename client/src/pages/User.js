import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import BootNav from '../components/BootNav'
import StackCard from '../components/StackCard'
import { Button, Form } from 'react-bootstrap'

const User = (props) => {
  const [userData, setUserData] = useState({})
  const [stacks, setStacks] = useState([])
  const [stackQuery, setStackQuery] = useState('')
  const [thumbnailQuery, setThumbnailQuery] = useState('')
  const { currentUsername, setCurrentUsername } = props

  const getDataByUsername = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${currentUsername}`)
      const newUserData = res.data.user[0]
      setUserData(newUserData)
    } catch (err) {
      console.log(err)
    }
  }
  const getExistingStacks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${currentUsername}/stack`)
      setStacks(res.data.stacks)
    } catch (err) {
      console.log(err)
    }
  }

  const postNewStack = async (e) => {
    e.preventDefault()
    try {
      const res = await axios
        .post(`${BASE_URL}/user/${currentUsername}/stack`, {
          name: stackQuery,
          thumbnail: thumbnailQuery,
          user: userData._id
        })
        .then(function (response) {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (err) {
      console.log(err)
    }
    getExistingStacks()
  }
  const handleChange = (event) => {
    setStackQuery(event.target.value)
  }
  const handleThumbChange = (event) => {
    setThumbnailQuery(event.target.value)
  }
  const deleteStack = async (e, index) => {
    if (e.target.type === 'button') {
      let newArray = [...stacks]
      const objectToDelete = newArray[index]
      newArray.splice(index, 1)
      setStacks(newArray)
      try {
        const res = await axios.delete(
          `${BASE_URL}/user/${currentUsername}/stack/${objectToDelete._id}`
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getByStackId = async (id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/${currentUsername}/stack/${id}`
      )
      props.history.push(`/user/${currentUsername}/stack/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickedStack = (e, index) => {
    if (!(e.target.type === 'button')) {
      let clickedStackId = stacks[index]._id
      getByStackId(clickedStackId)
    }
  }

  useEffect(() => {
    setCurrentUsername(props.match.params.username)
    getDataByUsername()
    getExistingStacks()
  }, [])

  return (
    <div className="page">
      <BootNav username={currentUsername} />
      <p>Welcome {userData.name}</p>
      <Form className="bootstrap-form-contain" onSubmit={postNewStack}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Create Stack:</Form.Label>
          <Form.Control
            type="text"
            placeholder="add new stack"
            value={stackQuery}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicURL">
          <Form.Label>Stack Image (optional):</Form.Label>
          <Form.Control
            type="text"
            placeholder="image url (optional)"
            value={thumbnailQuery}
            onChange={handleThumbChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
      <div className="stack-container">
        {stacks.length === 0 ? (
          <h2>NO STACKS</h2>
        ) : (
          stacks.map((stack, index) => (
            <StackCard
              name={stack.name}
              key={index}
              thumbnail={stack.thumbnail}
              id={stack._id}
              stackId={stack._id}
              onClick={(e) => handleClickedStack(e, index)}
              onClickDelete={(e) => deleteStack(e, index)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default User
