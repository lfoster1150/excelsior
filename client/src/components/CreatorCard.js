import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

const CreatorCard = (props) => {
  return (
    <ListGroup.Item className="creator-card">
      {props.string}
      <Button className="delete-button" onClick={props.onClick}>
        X
      </Button>
    </ListGroup.Item>
  )
}

export default CreatorCard
