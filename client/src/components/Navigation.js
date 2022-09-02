import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link, Outlet } from "react-router-dom"

const Navigation = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My Rorschach</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" as={Link} to="/">Home</Nav.Link>
              <Nav.Link href="#draw" as={Link} to="/draw">Draw</Nav.Link>
              <Nav.Link href="#rorschachs" as={Link} to="/rorschachs">Rorschachs</Nav.Link>
              <Nav.Link href="#discuss" as={Link} to="/discuss">Discuss</Nav.Link>
              <Nav.Link href="#users" as={Link} to="/users">Users</Nav.Link>
              <Nav.Link href="#login" as={Link} to="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet/>
      </section>
    </>
  )
}

export default Navigation