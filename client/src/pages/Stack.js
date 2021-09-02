import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BootNav from '../components/BootNav'
import ComicCardInStack from '../components/ComicCardInStack'
import { BASE_URL } from '../globals'
import CreatorCard from '../components/CreatorCard'
import {
  Navbar,
  Container,
  Form,
  Button,
  Row,
  Col,
  ListGroup
} from 'react-bootstrap'

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
  const { username, id, comic_id } = props.match.params

  const setCurrentStackIdOnMount = () => {
    setCurrentStackId(props.match.params.id)
  }

  const getStackComics = async () => {
    if (id && currentUsername) {
      try {
        const res = await axios.get(
          `${BASE_URL}/user/${currentUsername}/stack/${id}/comic`
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
        .post(`${BASE_URL}/user/${currentUsername}/stack/${id}/comic`, {
          title: newComicQuery.title,
          description: newComicQuery.description,
          release_date: newComicQuery.release_date,
          cover_image: newComicQuery.cover_image,
          creators: [...creatorState],
          stack: id
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
  // handles when comic cover is clicked in stack view
  const handleClickedComic = (e, index) => {
    e.preventDefault()
    if (!(e.target.type === 'button')) {
      let clickedComicId = stackComics[index]._id
      getComicDetailsByStackId(clickedComicId)
    }
  }
  // Uses ID from click handler to travel to specific comics details page
  const getComicDetailsByStackId = async (id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/${currentUsername}/stack/${currentStackId}/comic/${id}`
      )
      props.history.push(
        `/user/${currentUsername}/stack/${currentStackId}/comic/${id}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  const addCreatorMap = () => {
    return (
      <ListGroup>
        {creatorState.map((creator, index) => (
          <CreatorCard
            key={index}
            string={creator}
            onClick={(e) => removeCreatorFromState(e, index)}
          />
        ))}
      </ListGroup>
    )
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
    <div className="page">
      <BootNav username={username} />
      <Navbar className="add-comic-nav" expand="lg">
        <Container fluid>
          <Navbar.Brand>Add a new comic...</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Container fluid className="add-creator-container">
              <Form
                className="bootstrap-form-contain"
                onSubmit={addCreatorToState}
              >
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Creator role:</Form.Label>
                      <Form.Control
                        name="job_title"
                        type="text"
                        placeholder="enter role of creator"
                        value={creatorQuery.job_title}
                        onChange={handleCreatorChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicURL">
                      <Form.Label>Creator Name:</Form.Label>
                      <Form.Control
                        name="name"
                        type="text"
                        placeholder="enter name of creator"
                        value={creatorQuery.name}
                        onChange={handleCreatorChange}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="submit-button"
                    >
                      Add Creator
                    </Button>
                  </Col>
                  <Col>
                    <div className="creator-card-container">
                      {creatorState.length === 0 ? (
                        <h2>No creators added yet...</h2>
                      ) : (
                        addCreatorMap()
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Container>
            <Container fluid className="add-form-container">
              <Form onSubmit={postNewComic}>
                <Form.Group className="mb-3" controlId="formBasicURL">
                  <Form.Label>New Comic Details:</Form.Label>
                  <Form.Control
                    name="title"
                    type="text"
                    placeholder="enter comic title"
                    value={newComicQuery.title}
                    onChange={handleChange}
                  />
                  <Form.Control
                    name="description"
                    as="textarea"
                    placeholder="enter comic description (optional)"
                    value={newComicQuery.description}
                    onChange={handleChange}
                  />
                  <Form.Control
                    name="release_date"
                    type="text"
                    placeholder="enter release date (optional)"
                    value={newComicQuery.release_date}
                    onChange={handleChange}
                  />
                  <Form.Control
                    name="cover_image"
                    type="text"
                    placeholder="enter image url (optional)"
                    value={newComicQuery.cover_image}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="submit-button"
                >
                  Add Comic to Stack!
                </Button>
              </Form>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="stack-container">
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
      </Container>
    </div>
  )
}

export default Stack
