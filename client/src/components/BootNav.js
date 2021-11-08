import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const BootNav = (props) => {
  const { user, id, authenticated, handleLogOut} = props
  return (
    <Navbar variant="dark" className="nav-bar">
      <Container>
        <Navbar.Brand href={`/`}>Excelsior!</Navbar.Brand>
        <Nav className="me-auto">
          {user ? (
            <Nav.Link href={`/user/${user.username}`}>User</Nav.Link>
          ) : undefined}
          {user && id ? (
            <Nav.Link href={`/user/${user.username}/stack/${id}`}>Stack</Nav.Link>
          ) : undefined}
          {user && authenticated ? (
            <Nav.Link href={`/marvel`}>Search</Nav.Link>
          ) : undefined}
        </Nav>
      </Container>
      <Container className="sign-out">
        <Nav >
          {user && authenticated ? (
            <Nav.Link href={`/`} onClick={handleLogOut}>Sign Out</Nav.Link>
          ) : undefined}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default BootNav
