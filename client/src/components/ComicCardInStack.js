import React, { useState } from 'react'
import defaultThumb from './images/comics.jpg'
import { Card, OverlayTrigger } from 'react-bootstrap'

const ComicCardInStack = (props) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const {
    creators,
    title,
    description,
    release_date,
    cover_image,
    thumbnail,
    api,
    api_id,
    id,
    comicId,
    onClick,
    onClickDelete
  } = props

  // const showOverlay = (e) => {
  //   let overlay = e.target.lastElementChild
  //   if (overlay) {
  //     e.target.lastElementChild.style.zIndex = '1'
  //   }
  // }
  // const hideOverlay = (e) => {
  //   let overlay = e.target.lastElementChild
  //   if (overlay) {
  //     e.target.lastElementChild.style.zIndex = '-1'
  //   }
  // }

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
        </Card.ImgOverlay>
      ) : undefined}
    </Card>

    // <li className="comic-card">
    //   <img
    //     onClick={onClick}
    //     src={cover_image || defaultThumb}
    //     alt={title}
    //     className="comic-cover"
    //   />
    //   <h3>{title}</h3>
    //   <button type="button" onClick={onClickDelete}>
    //     X
    //   </button>
    // </li>
  )
}

export default ComicCardInStack
