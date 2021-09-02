import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { Card, Button } from 'react-bootstrap'

const ComicCardInStack = (props) => {
  const [showOverlay, setShowOverlay] = useState(false)

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
    <Card
      className="card-in-stack"
      onClick={onClick}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <Card.Img
        src={cover_image || defaultThumb}
        alt={title}
        onClick={onClick}
      />
      {showOverlay ? (
        <Card.ImgOverlay>
          <Card.Title>{title}</Card.Title>
          <Button
            className="delete-button"
            variant="dark"
            onClick={onClickDelete}
          >
            X
          </Button>
        </Card.ImgOverlay>
      ) : undefined}
    </Card>

    // <li className="comic-card">
    //   <img
    //     onClick={onClick}
    //     src={cover_image || defaultThumb}
    //     alt={title}
    //     className="comic-cover"
    //   />
    //   <h3>{title}</h3>
    //   <button type="button" onClick={onClickDelete}>
    //     X
    //   </button>
    // </li>
  )
}

export default ComicCardInStack
