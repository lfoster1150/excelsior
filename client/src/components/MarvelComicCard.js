import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import {
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  DropdownType,
  ButtonGroup
} from 'react-bootstrap'

const MarvelComicCard = (props) => {
  const [showOverlay, setShowOverlay] = useState(true)
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
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">Stack</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button className="add-button" onClick={onClickAdd}>
              +
            </Button>
          </Row>
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
