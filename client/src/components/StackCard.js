import React from 'react'
import defaultThumb from './images/comics.jpg'

const StackCard = (props) => {
  const { name, thumbnail, onClick } = props
  return (
    <div className="stack-card" onClick={onClick}>
      <img src={thumbnail || defaultThumb} alt={name} className="stack-thumb" />
      <h3>{name}</h3>
      <button type="button" onClick={props.onClickDelete}>
        X
      </button>
    </div>
  )
}

export default StackCard
