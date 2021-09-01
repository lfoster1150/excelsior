import React from 'react'
import defaultThumb from './images/comics.jpg'

const MarvelComicCard = (props) => {
  const {
    creators,
    title,
    description,
    release_date,
    cover_image,
    thumbnail,
    api,
    api_id,
    id,
    comicId,
    onClick,
    onClickAdd
  } = props

  const goToMarvelComicPage = () => {
    console.log(api_id)
  }

  return (
    <li className="marvel-comic-card">
      <img
        onClick={goToMarvelComicPage}
        src={cover_image || defaultThumb}
        alt={title}
        className="comic-cover"
      />
      <h3>{title}</h3>
      <button type="button" onClick={onClickAdd}>
        +
      </button>
    </li>
  )
}

export default MarvelComicCard
