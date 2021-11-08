import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BootNav from '../components/BootNav'
import { MARVEL_KEY, PRIVATE_KEY, MARVEL_BASE } from '../globals'
import Footer from '../components/Footer'
const md5 = require('js-md5')

const MarvelComicDetails = (props) => {
  const [areDetailsLoaded, setAreDetailsLoaded] = useState(false)
  const [comicDetails, setComicDetails] = useState({})
  const [creatorArray, setCreatorArray] = useState([])
  const { api_id } = props.match.params
  const { user, authenticated } = props
  
  const defaultMarvelLink = 'http://marvel.com'

  // Gets details on page mount
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

  // Adds creator names and roles if creator array present in axios result
  const addDetails = () => {
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
      <BootNav authenticated={authenticated} user={user} search="search" />
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
          <a
            className="marvel-link"
            href={comicDetails.urls[0].url || defaultMarvelLink}
          >
            See More At Marvel...
          </a>
        </div>
      ) : undefined}
      <div className="spacer">
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  )
}

export default MarvelComicDetails
