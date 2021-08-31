import React from 'react'
import defaultThumb from './images/comics.jpg'

const ComicCardInStack = (props) => {
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
    onClickDelete
  } = props

  return (
    <li className="comic-card">
      <img
        onClick={onClick}
        src={cover_image || defaultThumb}
        alt={title}
        className="comic-cover"
      />
      <h3>{title}</h3>
      <button type="button" onClick={onClickDelete}>
        X
      </button>
    </li>
  )
}

export default ComicCardInStack
