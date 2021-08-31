import React from 'react'
import defaultThumb from './images/comics.jpg'

const StackCard = (props) => {
  const { name, thumbnail, onClick, onClickDelete, stackId } = props
  return (
    <div className="stack-card" onClick={onClick}>
      <img src={thumbnail || defaultThumb} alt={name} className="stack-thumb" />
      <h3>{name}</h3>
      <button type="button" onClick={onClickDelete}>
        X
      </button>
      <h6>{stackId}</h6>
    </div>
  )
}

export default StackCard
