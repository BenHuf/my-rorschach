import logo from "../assets/images/logo.svg";
import "../assets/stylesheets/App.css";
import { Link, Outlet } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="bck-image">
      <div className="home-container">
        <div className="bg">
          <h2 className="greet">Welcome to</h2>
          <h1 className="site-name">My Rorschach</h1>
          <p className="para">
            Design abstract art with strangers, browse past creations, and weigh
            in on what you see!{" "}
          </p>
          <a href="/login">
            <button className="home-btn-log">Login</button>
          </a>
          <br></br>
          <a href="/signup">
            <button className="home-btn-sign">Sign Up</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
