import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'
import ComicCardInStack from '../components/ComicCardInStack'
import { BASE_URL } from '../globals'
import CreatorCard from '../components/CreatorCard'

const Stack = (props) => {
  const [currentStackId, setCurrentStackId] = useState('')
  const [stackComics, setStackComics] = useState([])
  const [newComicQuery, setNewComicQuery] = useState({
    title: '',
    description: '',
    release_date: '',
    cover_image: ''
  })
  const [creatorState, setCreatorState] = useState([])
  const [creatorQuery, setCreatorQuery] = useState({
    name: '',
    job_title: ''
  })
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

  const addCreatorToState = (e) => {
    e.preventDefault()
    const creatorString = `${creatorQuery.job_title}: ${creatorQuery.name}`
    setCreatorState([...creatorState, creatorString])
    setCreatorQuery({
      name: '',
      job_title: ''
    })
  }

  const removeCreatorFromState = (e, index) => {
    e.preventDefault()
    let newArray = [...creatorState]
    newArray.splice(index, 1)
    setCreatorState(newArray)
  }

  // Handles New Comic Form Submission

  const postNewComic = async (e) => {
    e.preventDefault()

    try {
      const res = await axios
        .post(
          `${BASE_URL}/user/${currentUsername}/stack/${currentStackId}/comic`,
          {
            title: newComicQuery.title,
            description: newComicQuery.description,
            release_date: newComicQuery.release_date,
            cover_image: newComicQuery.cover_image,
            creators: [...creatorState],
            stack: currentStackId
          }
        )
        .then(function (response) {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (err) {
      console.log(err)
    }
    getStackComics()
  }

  // Handles new changes to all new comic inputs except creator fields
  const handleChange = (e) => {
    setNewComicQuery({ ...newComicQuery, [e.target.name]: e.target.value })
  }
  // Handles new changes to creator fields
  const handleCreatorChange = (e) => {
    setCreatorQuery({ ...creatorQuery, [e.target.name]: e.target.value })
  }
  // deletes comic based on index passed in from onClick
  const deleteComic = async (e, index) => {
    if (e.target.type === 'button') {
      let newArray = [...stackComics]
      const objectToDelete = newArray[index]
      newArray.splice(index, 1)
      setStackComics(newArray)
      try {
        const res = await axios.delete(
          `${BASE_URL}/user/${currentUsername}/stack/${currentStackId}/comic/${objectToDelete._id}`
        )
      } catch (error) {
        console.log(error)
      }
    }
    getStackComics()
  }

  const handleClickedComic = (e, index) => {
    console.log(e)
    console.log(index)
    // if (!(e.target.type === 'button')) {
    //   let clickedStackId = stacks[index]._id
    //   getByStackId(clickedStackId)
    // }
  }
  const addCreatorMap = () => {
    return creatorState.map((creator, index) => (
      <CreatorCard
        key={index}
        string={creator}
        onClick={(e) => removeCreatorFromState(e, index)}
      />
    ))
  }

  useEffect(() => {
    if (currentStackId && currentUsername) {
      getStackComics()
    }
  }, [currentStackId, currentUsername])

  useEffect(() => {
    addCreatorMap()
  }, [creatorState])

  useEffect(() => {
    setCurrentUsername(props.match.params.username)
    setCurrentStackId(props.match.params.id)
  }, [])

  return (
    <div>
      <Nav />
      <h1>Stack Page</h1>
      <ul className="stack-container">
        {stackComics.length === 0 ? (
          <h2>NO COMICS</h2>
        ) : (
          stackComics.map((comic, index) => (
            <ComicCardInStack
              className="comic-card in-stack"
              key={index}
              creators={comic.creators}
              title={comic.title}
              description={comic.description}
              release_date={comic.release_date}
              cover_image={comic.cover_image}
              thumbnail={comic.thumbnail}
              api={comic.api}
              api_id={comic.api_id}
              id={comic._id}
              comicId={comic._id}
              onClick={(e) => handleClickedComic(e, index)}
              onClickDelete={(e) => deleteComic(e, index)}
            />
          ))
        )}
      </ul>
      <div className="add-new-comic">
        <h3>Add A New Comic</h3>
        <form onSubmit={postNewComic} className="add-details">
          <TextInput
            type="text"
            name="title"
            placeholder="enter comic title"
            value={newComicQuery.title}
            onChange={handleChange}
          />
          <TextInput
            type="text-area"
            name="description"
            placeholder="enter comic description (optional)"
            value={newComicQuery.description}
            onChange={handleChange}
          />
          <TextInput
            type="date"
            placeholder={'enter release date (optional)'}
            name="release_date"
            value={newComicQuery.release_date}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder={'enter URL for image cover (optional)'}
            name="cover_image"
            value={newComicQuery.cover_image}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
        <div className="add-creator">
          <div className="add-creator-inputs">
            <TextInput
              type="text"
              placeholder={'enter job title of creator'}
              name="job_title"
              value={creatorQuery.job_title}
              onChange={handleCreatorChange}
            />
            <TextInputWithButton
              type="text"
              placeholder={'enter name of creator'}
              name="name"
              text="ADD"
              value={creatorQuery.name}
              onChange={handleCreatorChange}
              onSubmit={addCreatorToState}
            />
          </div>
          <div className="creator-card-container">
            {creatorState.length === 0 ? (
              <h2>No creators added yet...</h2>
            ) : (
              addCreatorMap()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stack
