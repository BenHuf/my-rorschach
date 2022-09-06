import { useContext } from 'react';
import context from 'react-bootstrap/esm/AccordionContext';
import logo from '../assets/images/logo.svg'
import '../assets/stylesheets/App.css';
import Auth from '../utils/auth'


const Home = (props) => {
  return (
    <div className="bg">
      <div className="home-container">
        <h2 className="greet">Welcome to</h2>
        <h1 className="site-name">My Rorschach</h1>
        <p className="para">
          Design abstract art with strangers, browse past creations, and weigh
          in on what you see!{" "}
        </p>



        {Auth.loggedIn() ? (
          <>
            <p>Welcome, {Auth.getProfile().data.username}</p>
            <br/>
            <button className="home-btn-draw">Draw</button>
          </>
        ) : (
          <>
            <button className="home-btn-log">Login</button>
            <br></br>
            <button className="home-btn-sign">Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
}
  

  

export default Home;