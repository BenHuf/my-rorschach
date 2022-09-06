import logo from "../assets/images/logo.svg";
import "../assets/stylesheets/App.css";

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
          <button className="home-btn-log">Login</button>
          <br></br>
          <button className="home-btn-sign">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
