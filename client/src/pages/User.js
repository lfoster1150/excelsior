import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { GetDataByUsername, GetStacks, PostStack } from '../services/UserServices'
import StackCard from '../components/StackCard'
import { Button, Form } from 'react-bootstrap'

const User = (props) => {
  const [userData, setUserData] = useState({})
  const [stacks, setStacks] = useState([])
  const [stackQuery, setStackQuery] = useState('')
  const [thumbnailQuery, setThumbnailQuery] = useState('')
  const { user, authenticated} = props

  // On page mount: gets data for current user based on username
  const getDataByUsername = async (username) => {
    const newUserData = await GetDataByUsername(username)
    setUserData(newUserData)
  }

  // On page mount and after new stack is created: gets data for current user based on username
  const getExistingStacks = async (username) => {
      const stacks = await GetStacks(username)
      setStacks(stacks)
  }

  // Submit button onSubmit: adds new stack
  const postNewStack = async (e) => {
    e.preventDefault()
    const data = {
      name: stackQuery,
      thumbnail: thumbnailQuery,
      user: userData._id
    }
    const stack = await PostStack(user.username, data)
    setStacks([...stacks, stack])
  }
  
  // The two below handle form inputs onChange
  const handleChange = (event) => {
    setStackQuery(event.target.value)
  }
  const handleThumbChange = (event) => {
    setThumbnailQuery(event.target.value)
  }
  // onClick "X" button: deletes stack locally and in DB based on Stack _id
  const deleteStack = async (e, index) => {
    if (e.target.type === 'button') {
      let newArray = [...stacks]
      const objectToDelete = newArray[index]
      newArray.splice(index, 1)
      setStacks(newArray)
      try {
        await axios.delete(
          `${BASE_URL}/user/${user.username}/stack/${objectToDelete._id}`
        )
      } catch (error) {
        console.log(error)
      }
    }
  }
  // Gets and travels to specific stack page based on Stack _id
  const getByStackId = async (id) => {
    try {
      await axios.get(`${BASE_URL}/user/${user.username}/stack/${id}`)
      props.history.push(`/user/${user.username}/stack/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
  // If onClick event is not "X" button upplies getByStackId with stack _id based on index
  const handleClickedStack = (e, index) => {
    if (!(e.target.type === 'button')) {
      let clickedStackId = stacks[index]._id
      getByStackId(clickedStackId)
    }
  }
  // Sets up data on User page mount
  useEffect(() => {
    getDataByUsername(user.username)
    getExistingStacks(user.username)
  }, [])

  return (
    <div className="page">
      { props.match.params.username === user.username ? (
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
      ) : undefined
      }
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
