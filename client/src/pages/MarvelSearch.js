import React, { useEffect, useState } from 'react'
import { BASE_URL, MARVEL_KEY, PRIVATE_KEY, MARVEL_BASE } from '../globals'
import axios from 'axios'
import BootNav from '../components/BootNav'
import MarvelComicCard from '../components/MarvelComicCard'
import Footer from '../components/Footer'
import { Button, Form, Dropdown } from 'react-bootstrap'
const md5 = require('js-md5')

const MarvelSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [stacks, setStacks] = useState([])
  const [currentStack, setCurrentStack] = useState({
    name: 'Select Stack',
    stack_id: null
  })
  const { 
    currentSearch, 
    setCurrentSearch, 
    user, 
    authenticated, 
    handleLogOut, 
    searchResults, 
    setSearchResults 
  } = props
  // Gets current stacks based on username
  const getStacksByUsername = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${user.username}/stack`)
      const resStacks = res.data.stacks
      setStacks(resStacks)
    } catch (err) {
      console.log(err)
    }
  }
  // Uses marvel API to search comics
  const searchComics = async (title) => {
    let ts = Date.now()
    let hash = md5(`${ts}${PRIVATE_KEY}${MARVEL_KEY}`)
    try {
      const res = await axios.get(
        `${MARVEL_BASE}/comics?title=${title}&ts=${ts}&apikey=${MARVEL_KEY}&hash=${hash}`
      )
      const resResults = res.data.data.results
      setSearchResults(resResults)
      setCurrentSearch(searchQuery)
    } catch (err) {
      console.log(err)
    }
  }
  // Handles search input field onChange
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }
  // Handles submit search query
  const handleSubmit = (e) => {
    e.preventDefault()
    searchComics(searchQuery)
  }
  // handles switch to detail page. Still not sure if I need the axios call
  const goToMarvelComicPage = (id) => {
    try {
      // const res = await axios.get(`${BASE_URL}/user/${currentUsername}/marvel/`)
      props.history.push(`/marvel/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
  // Handles clicking on Marvel comic card
  const handleClickedComic = (e, index) => {
    e.preventDefault()
    if (
      !(e.target.type === 'button') &&
      !(e.target.className === 'dropdown-item')
    ) {
      let clickedComicId = searchResults[index].id
      goToMarvelComicPage(clickedComicId)
    }
  }
  // // Selects list to add comic to
  const selectStack = (e) => {
    setCurrentStack({ name: stacks[e].name, stack_id: stacks[e]._id })
  }
  // Adds comic if stack selected
  const addComicToStack = async (comic) => {
    console.log(comic)
    if (currentStack.stack_id) {
      const creatorMap = comic.creators.items.map(creator => `${creator.role}: ${creator.name}`)
      try {
        await axios
          .post(
            `${BASE_URL}/user/${user.username}/stack/${currentStack.stack_id}/comic`,
            {
              creators: creatorMap,
              title: comic.title,
              description: comic.description,
              cover_image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
              api: 'Marvel',
              api_id: comic.id,
              stack: currentStack.stack_id
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
    } else {
      console.log('Must select a stack before adding comic.')
    }
  }

  // Gets added comic api_id
  const addComic = (e, index) => {
    if (e.target.type === 'button') {
      let clickedAddComic = searchResults[index]
      addComicToStack(clickedAddComic)
    }
  }
  // Adds search result cards to page if axios search comes back with results array
  const addSearchResultsMap = () => {
    if (searchResults.length > 0) {
      return searchResults.map((comic, index) => (
        <MarvelComicCard
          className="comic-card marvel"
          key={index}
          comic={comic}
          thumbnail={comic.thumbnail}
          api="Marvel"
          onClick={(e) => handleClickedComic(e, index)}
          onClickAdd={(e) => addComic(e, index)}
        />
      ))
    }
  }

  useEffect(() => {
    getStacksByUsername()
    if (currentSearch) {
        setSearchQuery(currentSearch)
      }
    }, [])
  
  return (
    <div className="page">
      <BootNav authenticated={authenticated} user={user} handleLogOut={handleLogOut} />
      <Form className="bootstrap-form-contain" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicURL">
          <Form.Label>Search:</Form.Label>
          <Form.Control
            type="text"
            placeholder="search for comics"
            value={searchQuery}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
      <div className="search-page-dropdown">
        <Dropdown className="stack-selector" onSelect={selectStack}>
          <Dropdown.Toggle id="dropdown-basic">
            {currentStack.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {stacks.length === 0
              ? undefined
              : stacks.map((stack, index) => (
                  <Dropdown.Item key={index} eventKey={index}>
                    {stack.name}
                  </Dropdown.Item>
                ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="search-results-container">
        {searchResults.length === 0 ? (
          <h2>NO COMICS</h2>
        ) : (
          addSearchResultsMap()
        )}
      </div>
      <div className="spacer">
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  )
}

export default MarvelSearch
