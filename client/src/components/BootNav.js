import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const BootNav = (props) => {
  const { username, id } = props
  return (
    <Navbar variant="dark" className="nav-bar">
      <Container>
        <Navbar.Brand href={`/`}>Excelsior!</Navbar.Brand>
        <Nav className="me-auto">
          {username ? (
            <Nav.Link href={`/user/${username}`}>User</Nav.Link>
          ) : undefined}
          {id ? (
            <Nav.Link href={`/user/${username}/stack/${id}`}>Stack</Nav.Link>
          ) : undefined}
          {username ? (
            <Nav.Link href={`/user/${username}/marvel`}>Search</Nav.Link>
          ) : undefined}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default BootNav
