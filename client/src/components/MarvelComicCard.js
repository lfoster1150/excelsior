import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { Card, Button, Dropdown, Row } from 'react-bootstrap'

const MarvelComicCard = (props) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const { title, cover_image, onClick, onClickAdd } = props

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
