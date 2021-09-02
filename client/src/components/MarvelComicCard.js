import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { Card, Button } from 'react-bootstrap'

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
          <Button className="delete-button" variant="dark" onClick={onClickAdd}>
            X
          </Button>
        </Card.ImgOverlay>
      ) : undefined}
    </Card>
  )
  // <li className="marvel-comic-card">
  //   <img
  //     onClick={onClick}
  //     src={cover_image || defaultThumb}
  //     alt={title}
  //     className="comic-cover"
  //   />
  //   <h3>{title}</h3>
  //   <button type="button" onClick={onClickAdd}>
  //     +
  //   </button>
  // </li>
}

export default MarvelComicCard
