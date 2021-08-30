import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../globals'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'

const User = (props) => {
  const [userData, setUserData] = useState({})
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

  useEffect(() => {
    setCurrentUsername(props.match.params.username)
    getDataByUsername()
  }, [])

  useEffect(() => {
    if (!userData === undefined) {
      getDataByUsername()
    }
  })

  const testState = () => {
    console.log(userData)
  }

  const testCollections = [
    { name: 'Vaccuum' },
    { listName: 'Sweep and Mop' },
    { listName: 'Get groceries' }
  ]

  return (
    <div className="page">
      <Nav />
      <button onClick={testState}>TEST</button>
    </div>
  )
}

export default User
