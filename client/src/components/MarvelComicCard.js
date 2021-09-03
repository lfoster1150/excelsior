import React, { useEffect, useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { BASE_URL } from '../globals'
import axios from 'axios'
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
  const [showOverlay, setShowOverlay] = useState(false)
  const {
    title,
    cover_image,
    onClick,
    onClickAdd,
    stacks,
    stackNames,
    onSelect
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
          <Row className="overlay-dropdown">
            <Dropdown onSelect={onSelect}>
              <Dropdown.Toggle id="dropdown-basic">Stack</Dropdown.Toggle>
              <Dropdown.Menu>
                {stacks.map((stack, index) => (
                  <Dropdown.Item eventKey={stackNames[index]}>
                    {stack.name}
                  </Dropdown.Item>
                ))}
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
