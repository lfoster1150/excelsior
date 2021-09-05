import React, { useEffect, useState } from 'react'
import { BASE_URL, MARVEL_KEY, PRIVATE_KEY, MARVEL_BASE } from '../globals'
import axios from 'axios'
import BootNav from '../components/BootNav'
import MarvelComicCard from '../components/MarvelComicCard'
import Footer from '../components/Footer'
import { Button, Form } from 'react-bootstrap'
const md5 = require('js-md5')

const MarvelSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [stacks, setStacks] = useState([])
  const [areStacksLoaded, setAreStacksLoaded] = useState(false)
  const [stackNames, setStackNames] = useState([])
  const [hasSearchFinished, setHasSearchFinished] = useState(false)
  const [currentStack, setCurrentStack] = useState('')
  const { username } = props.match.params
  const { currentSearch, setCurrentSearch } = props
  // Gets names of stacks after stacks gathered to feed into dropdown menus on overlay
  const getStackNames = (arr) => {
    return arr.map((stack) => {
      return stack.name
    })
  }
  // Gets current stacks based on username
  const getStacksByUsername = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${username}/stack`)
      const resStacks = res.data.stacks
      setStacks(...stacks, resStacks)
      setAreStacksLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }
  // Uses marvel API to search comics
  const searchComics = async () => {
    let ts = Date.now()
    let hash = md5(`${ts}${PRIVATE_KEY}${MARVEL_KEY}`)
    try {
      const res = await axios.get(
        `${MARVEL_BASE}/comics?title=${searchQuery}&ts=${ts}&apikey=${MARVEL_KEY}&hash=${hash}`
      )
      setSearchResults(...searchResults, res.data.data.results)
      setCurrentSearch(searchQuery)
      setHasSearchFinished(true)
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
    searchComics()
  }
  // handles switch to detail page. Still not sure if I need the axios call
  const goToMarvelComicPage = (id) => {
    try {
      // const res = await axios.get(`${BASE_URL}/user/${currentUsername}/marvel/`)
      props.history.push(`/user/${username}/marvel/${id}`)
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
  // const selectStack = (e) => {
  //   console.log('Stack')
  //   console.log(e)
  // }
  // // Adds comic to selected stack
  // const addComic = (e) => {
  //   console.log("Add")
  //   console.log(e)
  // }
  // Adds search result cards to page if axios search comes back with results array
  const addSearchResultsMap = () => {
    if (hasSearchFinished) {
      return searchResults.map((comic, index) => (
        <MarvelComicCard
          key={index}
          className="comic-card marvel"
          stacks={stacks}
          stackNames={stackNames}
          creators={comic.creators.items}
          title={comic.title}
          description={comic.description}
          release_date={comic.dates[0]}
          cover_image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          thumbnail={comic.thumbnail}
          api="Marvel"
          api_id={comic.id}
          username={username}
          onClick={(e) => handleClickedComic(e, index)}
          currentStack
          setCurrentStack={setCurrentStack}
        />
      ))
    }
  }

  useEffect(() => {
    if (areStacksLoaded) {
      setStackNames(getStackNames(stacks))
    }
  }, [areStacksLoaded])

  useEffect(() => {
    getStacksByUsername()
    if (currentSearch) {
      setSearchQuery(currentSearch)
      searchComics()
    }
  }, [])

  return (
    <div className="page">
      <BootNav username={username} />
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
