import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { Card, Button, Dropdown, Row } from 'react-bootstrap'

const MarvelComicCard = (props) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const {
    title,
    cover_image,
    onClick,
    stacks,
    stackNames,
    currentStack,
    setCurrentStack
  } = props

  // Selects list to add comic to
  const selectStack = (e) => {
    console.log('Stack')
    console.log(e)
    setCurrentStack(e)
  }
  // Adds comic to selected stack
  const addComic = (e) => {
    console.log('Add')
  }
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
            <Dropdown onSelect={selectStack}>
              <Dropdown.Toggle id="dropdown-basic">Stack</Dropdown.Toggle>
              <Dropdown.Menu>
                {stacks.map((stack, index) => (
                  <Dropdown.Item key={index} eventKey={stackNames[index]}>
                    {stack.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button className="add-button" onClick={addComic}>
              +
            </Button>
          </Row>
        </Card.ImgOverlay>
      ) : undefined}
    </Card>
  )
}

export default MarvelComicCard
