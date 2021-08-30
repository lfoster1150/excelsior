import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="nav-bar">
      <div className="links">
        <NavLink to="/">Home</NavLink>
      </div>
    </nav>
  )
}

export default Nav
