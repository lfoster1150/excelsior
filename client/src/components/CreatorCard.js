import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'

const CreatorCard = (props) => {
  return (
    <ListGroup.Item className="creator-card">
      {props.string}
      <Button className="delete-button" onClick={props.onClick}>
        X
      </Button>
    </ListGroup.Item>
    // <div className="creator-card" key={props.key}>
    //   <p>{props.string}</p>
    //   <button type="button" onClick={props.onClick}>
    //     X
    //   </button>
    // </div>
  )
}

export default CreatorCard
