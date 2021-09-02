import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import { MARVEL_KEY, PRIVATE_KEY, MARVEL_BASE } from '../globals'
const md5 = require('js-md5')

const MarvelComicDetails = (props) => {
  const [areDetailsLoaded, setAreDetailsLoaded] = useState(false)
  const [comicDetails, setComicDetails] = useState({})
  const [creatorArray, setCreatorArray] = useState([])
  const { username, api_id } = props.match.params

  const getComicDetailsById = async () => {
    let ts = Date.now()
    let hash = md5(`${ts}${PRIVATE_KEY}${MARVEL_KEY}`)
    try {
      const res = await axios.get(
        `${MARVEL_BASE}/comics/${api_id}?ts=${ts}&apikey=${MARVEL_KEY}&hash=${hash}`
      )
      setComicDetails(res.data.data.results[0])
      setCreatorArray(res.data.data.results[0].creators.items)
      setAreDetailsLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }

  const addDetails = () => {
    console.log(comicDetails.dates)
    return creatorArray.map((creator, index) => (
      <li key={index}>
        {creator.role}: {creator.name}
      </li>
    ))
  }

  useEffect(() => {
    getComicDetailsById()
  }, [])

  return (
    <div className="page">
      <Nav username={username} search="search" />
      {areDetailsLoaded ? (
        <div className="comic-details-container">
          <h2>{comicDetails.title}</h2>
          <img
            src={`${comicDetails.thumbnail.path}.${comicDetails.thumbnail.extension}`}
            alt={comicDetails.title}
            className="cover"
          />
          {comicDetails.dates[0].date ? (
            <h4 className="release-date">
              Release date: {comicDetails.dates[0].date}
            </h4>
          ) : undefined}
          <ul className="creators-ul">
            {creatorArray.length === 0 ? (
              <li>Creators Not Available</li>
            ) : (
              addDetails()
            )}
          </ul>
          <p className="comic-description">
            Description: {comicDetails.description}
          </p>
        </div>
      ) : undefined}
    </div>
  )
}

export default MarvelComicDetails
