import React from 'react'

const CreatorCard = (props) => {
  return (
    <div className="creator-card" key={props.key}>
      <p>{props.string}</p>
      <button type="button" onClick={props.onClick}>
        X
      </button>
    </div>
  )
}

export default CreatorCard
