import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import { BASE_URL } from '../globals'
import defaultThumb from '../components/images/comics.jpg'

const ComicDetails = (props) => {
  const [detailsSet, setDetailsSet] = useState(false)
  const [comicDetails, setComicDetails] = useState({})
  const [creatorArray, setCreatorArray] = useState([])
  const { username, id, comic_id } = props.match.params

  const getComicDetailsById = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/${username}/stack/${id}/comic/${comic_id}`
      )
      setComicDetails(res.data.comics)
    } catch (err) {
      console.log(err)
    }
    setDetailsSet(true)
  }

  const addDetails = () => {
    return comicDetails.creators.map((creator, index) => (
      <li key={index}>{creator}</li>
    ))
  }

  // watches comicDetails
  useEffect(() => {
    if (detailsSet) {
      console.log(comicDetails.creators)
      setCreatorArray(comicDetails.creators)
    }
  }, [detailsSet])

  useEffect(() => {
    getComicDetailsById()
  }, [])

  return (
    <div className="page">
      <Nav />
      <div className="back-container">
        <a href={`/user/${username}/stack/${id}/comic`} className="back-link">
          BACK TO STACK
        </a>
      </div>
      <div className="comic-details-container">
        <h2>Title: {comicDetails.title}</h2>
        <img
          src={comicDetails.cover_image || defaultThumb}
          alt={comicDetails.title}
          className="cover"
        />
        <ul className="creators-ul">
          {creatorArray.length === 0 ? (
            <li>Creators Not Available</li>
          ) : (
            addDetails()
          )}
        </ul>
        <p>Description: {comicDetails.description}</p>
        <h4>Release date: {comicDetails.release_date}</h4>
      </div>
    </div>
  )
}

export default ComicDetails
