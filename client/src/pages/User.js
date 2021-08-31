import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'

const User = (props) => {
  const [userData, setUserData] = useState({})
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

  const postNewStack = async (e) => {
    e.preventDefault()
    try {
      const res = await axios
        .post(`${BASE_URL}/users/${currentUsername}/stack`, {
          name: stackQuery,
          thumbnail: thumbnailQuery,
          user_id: userData._id
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
  }
  const handleChange = (event) => {
    setStackQuery(event.target.value)
  }
  const handleThumbChange = (event) => {
    setThumbnailQuery(event.target.value)
  }

  useEffect(() => {
    setCurrentUsername(props.match.params.username)
    getDataByUsername()
  }, [])
  return (
    <div className="page">
      <Nav />
      <p>Welcome {userData.name}</p>
      <h2>create a new task below:</h2>
      <div className="list-container"></div>
      <TextInputWithButton
        onSubmit={postNewStack}
        name="Add"
        placeholder="add new username"
        value={stackQuery}
        onChange={handleChange}
      />
      <TextInput
        placeholder="thumbnail url (optional)"
        value={thumbnailQuery}
        onChange={handleThumbChange}
      />
    </div>
  )
}

export default User
