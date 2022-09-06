import { useContext } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import logo from "../assets/images/logo.svg";
import "../assets/stylesheets/App.css";
import Auth from "../utils/auth";

const Home = (props) => {
  return (
    <div className="bg-img">
      <div className="home-container">
        <div className="bg">
          <h2 className="greet">Welcome to</h2>
          <h1 className="site-name">My Rorschach</h1>
          <p className="para">
            Design abstract art with strangers, browse past creations, and weigh
            in on what you see!{" "}
          </p>

          {Auth.loggedIn() ? (
            <>
              <p>Welcome, {Auth.getProfile().data.username}</p>
              <br />
              <a href="/draw">
                <button className="home-btn-draw">Draw</button>
              </a>
            </>
          ) : (
            <>
              <a href="/login">
                <button className="home-btn-log">Login</button>
              </a>
              <br></br>
              <a href="/signup">
                <button className="home-btn-sign">Sign Up</button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
