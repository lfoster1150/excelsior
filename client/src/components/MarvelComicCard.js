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
  const [stacks, setStacks] = useState([])
  const { title, cover_image, onClick, onClickAdd } = props
  const { username } = props.history.params

  const getStacksUsername = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${username}`)
      console.log(res.data)
      const newUserData = res.data.user[0]
      // setUserData(newUserData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSelect = (e) => {
    console.log(e)
  }

  useEffect(() => {
    getStacksUsername()
  }, [])

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
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle id="dropdown-basic">Stack</Dropdown.Toggle>
              <Dropdown.Menu>
                {}
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else</Dropdown.Item>
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
