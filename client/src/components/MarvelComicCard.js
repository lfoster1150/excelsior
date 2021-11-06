import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { Card, Button, Row } from 'react-bootstrap'

const MarvelComicCard = (props) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const { onClick, onClickAdd, comic } = props

  return (
    <Card
      className="card-in-stack"
      onClick={onClick}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <Card.Img
        src={
          `${comic.thumbnail.path}.${comic.thumbnail.extension}`|| 
            defaultThumb
        }
        alt={comic.title}
        onClick={onClick}
      />
      {showOverlay ? (
        <Card.ImgOverlay>
          <Card.Title>{comic.title}</Card.Title>
          <Row className="overlay-dropdown">
            <Button className="add-button" onClick={onClickAdd}>
              +
            </Button>
          </Row>
        </Card.ImgOverlay>
      ) : undefined}
    </Card>
  )
}

export default MarvelComicCard
