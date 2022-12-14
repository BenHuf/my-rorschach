import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import Auth from "../utils/auth"
import { useQuery } from "@apollo/client"
import { QUERY_PICS } from "../utils/queries"
import logo from "../assets/images/logo-white.svg"
const Navigation = (props) => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  let i = ""
  let discussionUrl = ""

    const { loading, error, data } = useQuery(QUERY_PICS)
    if (data) {
      console.log(data)
    } else {
      discussionUrl = "/"
    }

    const randomDiscussion = () => {
      i = Math.floor(Math.random()*(data.pics.length))
      console.log(i)
      let pic = data.pics[i]._id
      discussionUrl = "/discuss/" + pic
      window.location.replace(discussionUrl)
    }

  return (
    <>
      <Navbar bg="nav" variant="dark" expand="lg">
        <Container className="nav-container">
          <Navbar.Brand as={Link} to="/">
          <img className="ml-2 mr-1" src={logo} width={29} height={29}/>
            My Rorschach
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-3" />
          <Navbar.Collapse id="basic-navbar-nav" className="px-3">
            <Nav>
              <Nav.Link href="#home" as={Link} to="/">
                Home
              </Nav.Link>
      
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link href="#draw" as={Link} to="/draw">
                    Draw
                  </Nav.Link>
                  <Nav.Link href="/rorschachs">
                    Rorschachs
                  </Nav.Link>
                  <Nav.Link href="#discuss" as={Link} onClick={randomDiscussion} to={discussionUrl}>
                    Discuss
                  </Nav.Link>
                  <a className="nav-link" href="/" onClick={logout}>
                    Logout
                  </a>
                </>
              ) : (
              <>
                <Nav.Link href="#login" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link href="#signup" as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Navigation;
