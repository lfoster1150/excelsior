import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = (props) => {
  const { username, id } = props
  return (
    <nav className="nav-bar">
      <div className="links">
        <NavLink className="nav-link" to={`/`}>
          Home
        </NavLink>
        {username ? (
          <NavLink className="nav-link" to={`/user/${username}`}>
            Back To User
          </NavLink>
        ) : undefined}
        <NavLink className="nav-link" to={`/user/${username}/marvel`}>
          Search Marvel
        </NavLink>
        {id ? (
          <NavLink className="nav-link" to={`/user/${username}/stack/${id}`}>
            Back To Stack
          </NavLink>
        ) : undefined}
      </div>
    </nav>
  )
}

export default Nav
