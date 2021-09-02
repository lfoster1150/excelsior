import React from 'react'
import defaultThumb from './images/comics.jpg'
import { Button, Card } from 'react-bootstrap'

const StackCard = (props) => {
  const { name, thumbnail, onClick, onClickDelete } = props
  return (
    <div className="stack-card">
      <Card style={{ width: '200px' }}>
        <Card.Img
          variant="top"
          src={thumbnail || defaultThumb}
          onClick={onClick}
        />
        <Card.Body className="stack-card-body">
          <Card.Title>{name}</Card.Title>
          <Button
            className="delete-button"
            variant="dark"
            onClick={onClickDelete}
          >
            X
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default StackCard
