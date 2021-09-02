import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { Card, Button } from 'react-bootstrap'

const ComicCardInStack = (props) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const { title, cover_image, onClick, onClickDelete } = props

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
  )
}

export default ComicCardInStack
