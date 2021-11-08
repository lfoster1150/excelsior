import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BootNav from '../components/BootNav'
import { BASE_URL } from '../globals'
import defaultThumb from '../components/images/comics.jpg'

const ComicDetails = (props) => {
  const [detailsSet, setDetailsSet] = useState(false)
  const [comicDetails, setComicDetails] = useState({})
  const [creatorArray, setCreatorArray] = useState([])
  const { user, authenticated } = props
  const { id, comic_id } = props.match.params
  // Gets comic details on page mount
  const getComicDetailsById = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/${user.username}/stack/${id}/comic/${comic_id}`
      )
      setComicDetails(res.data.comics)
    } catch (err) {
      console.log(err)
    }
    setDetailsSet(true)
  }
  // Adds creators to container
  const addDetails = () => {
    return comicDetails.creators.map((creator, index) => (
      <li key={index}>{creator}</li>
    ))
  }
  // watches comicDetails
  useEffect(() => {
    if (detailsSet) {
      setCreatorArray(comicDetails.creators)
    }
  }, [detailsSet])

  useEffect(() => {
    getComicDetailsById()
  }, [])

  return (
    <div className="page">
      <BootNav authenticated={authenticated} user={user} id={id} />
      <div className="comic-details-container">
        <h2>{comicDetails.title}</h2>
        <img
          src={comicDetails.cover_image || defaultThumb}
          alt={comicDetails.title}
          className="cover"
        />
        {comicDetails.release_date ? (
          <h4 className="release-date">
            Release date: {comicDetails.release_date}
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
    </div>
  )
}

export default ComicDetails
