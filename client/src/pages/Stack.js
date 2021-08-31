import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'
import ComicCardInStack from '../components/ComicCardInStack'
import { BASE_URL } from '../globals'

const Stack = (props) => {
  const [currentStackId, setCurrentStackId] = useState('')
  const [stackComics, setStackComics] = useState([])
  const { currentUsername, setCurrentUsername } = props

  const setCurrentStackIdOnMount = () => {
    setCurrentStackId(props.match.params.id)
  }

  const getStackComics = async () => {
    if (currentStackId && currentUsername) {
      try {
        const res = await axios.get(
          `${BASE_URL}/user/${currentUsername}/stack/${currentStackId}/comic`
        )
        setStackComics(res.data.comics)
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    setCurrentUsername(props.match.params.username)
    setCurrentStackId(props.match.params.id)
  }, [])

  useEffect(() => {
    if (currentStackId && currentUsername) {
      getStackComics()
    }
  }, [currentStackId, currentUsername])

  return (
    <div>
      <h1>Stack Page</h1>
      <div className="stack-container">
        {stackComics.length === 0 ? (
          <h2>NO COMICS</h2>
        ) : (
          stackComics.map((comic, index) => (
            <ComicCardInStack
              className="comic-card in-stack"
              name={stack.name}
              key={index}
              thumbnail={stack.thumbnail}
              id={stack._id}
              stackId={stack._id}
              onClick={(e) => handleClickedComic(e, index)}
              onClickDelete={(e) => deleteComic(e, index)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Stack
