import React from 'react'
import { Button, Card } from 'react-bootstrap'

const CreatorCard = (props) => {
  return (
    <Card className="creator-card">
      <Card.Body>
        <Card.Text>{props.string}</Card.Text>
        <Button
          className="delete-button"
          variant="dark"
          onClick={props.onClick}
        >
          X
        </Button>
      </Card.Body>
    </Card>

    // <div className="creator-card" key={props.key}>
    //   <p>{props.string}</p>
    //   <button type="button" onClick={props.onClick}>
    //     X
    //   </button>
    // </div>
  )
}

export default CreatorCard
