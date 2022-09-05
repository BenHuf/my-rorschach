import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link, Outlet } from "react-router-dom"
import Auth from "../utils/auth"

const Navigation = (props) => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
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
              {Auth.loggedIn() ? (
                <>
                  <a className="nav-link" href="/" onClick={logout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
            
                </>
              )}
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