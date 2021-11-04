import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const BootNav = (props) => {
  const { user, id, authenticated, handleLogOut} = props
  return (
    <Navbar variant="dark" className="nav-bar">
      <Container>
        <Navbar.Brand href={`/`}>Excelsior!</Navbar.Brand>
        <Nav className="me-auto">
          {user.username ? (
            <Nav.Link href={`/user/${user.username}`}>User</Nav.Link>
          ) : undefined}
          {id ? (
            <Nav.Link href={`/user/${user.username}/stack/${id}`}>Stack</Nav.Link>
          ) : undefined}
          {user.username ? (
            <Nav.Link href={`/user/${user.username}/marvel`}>Search</Nav.Link>
          ) : undefined}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default BootNav
