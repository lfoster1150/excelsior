import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'
import StackCard from '../components/StackCard'

const User = (props) => {
  const [userData, setUserData] = useState({})
  const [stacks, setStacks] = useState([])
  const [stackQuery, setStackQuery] = useState('')
  const [thumbnailQuery, setThumbnailQuery] = useState('')
  const { currentUsername, setCurrentUsername } = props

  const testStacks = [
    {
      name: 'Stack 1',
      thumbnail: '',
      user: '612d3574602e9f1aa9c5704e'
    },
    {
      name: 'Stack 3',
      thumbnail: '',
      user: '612d3574602e9f1aa9c5704e'
    },
    {
      name: 'Stack 2',
      thumbnail: '',
      user: '612d3574602e9f1aa9c5704e'
    }
  ]

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
  const deleteStack = (e) => {
    console.log(e)
  }
  const handleClickedStack = (e) => {
    console.log(e)
  }

  useEffect(() => {
    setCurrentUsername(props.match.params.username)
    getDataByUsername()
    getExistingStacks()
  }, [])

  return (
    <div className="page">
      <Nav />
      <p>Welcome {userData.name}</p>
      <h2>create a new comic stack below:</h2>
      <TextInputWithButton
        onSubmit={postNewStack}
        name="Add"
        placeholder="add new stack"
        value={stackQuery}
        onChange={handleChange}
      />
      <TextInput
        placeholder="thumbnail url (optional)"
        value={thumbnailQuery}
        onChange={handleThumbChange}
      />
      <div className="stack-container">
        {stacks.length === 0 ? (
          <h2>NO STACKS</h2>
        ) : (
          stacks.map((stack) => (
            <StackCard
              className="stack-name"
              name={stack.name}
              thumbnail={stack.thumbnail}
              key={stack.name}
              onClick={handleClickedStack}
              onClickDelete={deleteStack}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default User
