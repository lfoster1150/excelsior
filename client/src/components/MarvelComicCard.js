import React from 'react'
import defaultThumb from './images/comics.jpg'

const MarvelComicCard = (props) => {
  const { title, cover_image, onClick, onClickAdd } = props

  return (
    <li className="marvel-comic-card">
      <img
        onClick={onClick}
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
