import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const BootNav = (props) => {
  const { username, id } = props
  return (
    <Navbar variant="dark" className="nav-bar">
      <Container>
        <Navbar.Brand href={`/`}>Excelsior</Navbar.Brand>
        <Nav className="me-auto">
          {username ? (
            <Nav.Link href={`/user/${username}`}>User</Nav.Link>
          ) : undefined}
          {username ? (
            <Nav.Link href={`/user/${username}/marvel`}>Search</Nav.Link>
          ) : undefined}
          {id ? (
            <Nav.Link href={`/user/${username}/stack/${id}`}>Stack</Nav.Link>
          ) : undefined}
        </Nav>
      </Container>
    </Navbar>
    // <nav className="nav-bar">
    //   <div className="links">
    //     <NavLink className="nav-link" to={`/`}>
    //       Home
    //     </NavLink>
    //     {username ? (
    //       <NavLink className="nav-link" to={`/user/${username}`}>
    //         Back To User
    //       </NavLink>
    //     ) : undefined}
    //     <NavLink className="nav-link" to={`/user/${username}/marvel`}>
    //       Search Marvel
    //     </NavLink>
    //     {id ? (
    //       <NavLink className="nav-link" to={`/user/${username}/stack/${id}`}>
    //         Back To Stack
    //       </NavLink>
    //     ) : undefined}
    //   </div>
    // </nav>
  )
}

export default BootNav
