import React, { useEffect, useState } from 'react'
import { BASE_URL, MARVEL_KEY, PRIVATE_KEY, MARVEL_BASE } from '../globals'
import axios from 'axios'
import BootNav from '../components/BootNav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'
import MarvelComicCard from '../components/MarvelComicCard'
import Footer from '../components/Footer'
import { Button, Form } from 'react-bootstrap'
import StackCard from '../components/StackCard'
const md5 = require('js-md5')

const MarvelSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [stacks, setStacks] = useState([])
  const [stackNames, setStackNames] = useState([])
  const { username } = props.match.params
  const { currentSearch, setCurrentSearch } = props

  const getStackNames = () => {
    const namesArr = stacks.map((stack) => {
      return stack.name
    })
    console.log(namesArr)
    setStackNames(namesArr)
  }

  const getStacksByUsername = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${username}/stack`)
      console.log(res)
      const resStacks = res.data.stacks
      setStacks(resStacks)
      getStackNames()
    } catch (err) {
      console.log(err)
    }
  }

  const searchComics = async () => {
    setCurrentSearch(searchQuery)
    let ts = Date.now()
    let hash = md5(`${ts}${PRIVATE_KEY}${MARVEL_KEY}`)
    try {
      const res = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?title=${searchQuery}&ts=${ts}&apikey=${MARVEL_KEY}&hash=${hash}`
      )
      setSearchResults(...searchResults, res.data.data.results)
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchComics()
  }

  const handleSelect = (e) => {
    const index = parseFloat(e)
    console.log(stackNames[index])
  }

  const goToMarvelComicPage = (id) => {
    try {
      // const res = await axios.get(`${BASE_URL}/user/${currentUsername}/marvel/`)
      props.history.push(`/user/${username}/marvel/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
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

  const addComic = () => {}

  const addSearchResultsMap = () => {
    return searchResults.map((comic, index) => (
      <MarvelComicCard
        className="comic-card marvel"
        stacks={stacks}
        stackNames={stackNames}
        key={index}
        creators={comic.creators.items}
        title={comic.title}
        description={comic.description}
        release_date={comic.dates[0]}
        cover_image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        thumbnail={comic.thumbnail}
        api="Marvel"
        api_id={comic.id}
        username={username}
        onSelect={handleSelect}
        onClick={(e) => handleClickedComic(e, index)}
        onClickAdd={(e) => addComic(e, index)}
      />
    ))
  }

  // useEffect(() => {
  //   addSearchResultsMap()
  // }, [searchResults])
  useEffect(() => {
    getStacksByUsername()
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
