import React, { useEffect, useState } from 'react'
import { BASE_URL, MARVEL_KEY, PRIVATE_KEY, MARVEL_BASE } from '../globals'
import axios from 'axios'
import Nav from '../components/Nav'
import TextInput from '../components/TextInput'
import TextInputWithButton from '../components/TextInputWithButton'
import MarvelComicCard from '../components/MarvelComicCard'
import StackCard from '../components/StackCard'
const md5 = require('js-md5')

const MarvelSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const { username } = props.match.params

  const searchComics = async (e) => {
    e.preventDefault()
    let ts = Date.now()
    let hash = md5(`${ts}${PRIVATE_KEY}${MARVEL_KEY}`)
    try {
      const res = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?title=${searchQuery}&ts=${ts}&apikey=${MARVEL_KEY}&hash=${hash}`
      )
      setSearchResults(res.data.data.results)
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClickedComic = () => {}

  const addComic = () => {}

  const addSearchResultsMap = () => {
    return searchResults.map((comic, index) => (
      <MarvelComicCard
        className="comic-card marvel"
        key={index}
        creators={comic.creators.items}
        title={comic.title}
        description={comic.description}
        release_date={comic.dates[0]}
        cover_image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        thumbnail={comic.thumbnail}
        api="Marvel"
        api_id={comic.id}
        onClick={(e) => handleClickedComic(e, index)}
        onClickAdd={(e) => addComic(e, index)}
      />
    ))
  }

  useEffect(() => {
    addSearchResultsMap()
  }, [searchResults])

  useEffect(() => {}, [])

  return (
    <div className="page">
      <Nav username={username} />
      <h2>Search:</h2>
      <TextInputWithButton
        onSubmit={searchComics}
        name="search"
        text="Submit"
        placeholder="search for comics"
        value={searchQuery}
        onChange={handleChange}
      />
      <div className="search-results-container">
        {searchResults.length === 0 ? (
          <h2>NO COMICS</h2>
        ) : (
          addSearchResultsMap()
        )}
      </div>
    </div>
  )
}

export default MarvelSearch
