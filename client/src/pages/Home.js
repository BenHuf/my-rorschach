import logo from '../assets/images/logo.svg'
import '../assets/stylesheets/App.css';


const Home = (props) => {
  return (
    <div className="bck-image">
      <div className="home-container">
        <h2 className="greet">Welcome to</h2>
        <h1 className="site-name">My Rorschach</h1>
        <p className="para">
          Design abstract art with strangers, browse past creations, and weigh
          in on what you see!{" "}
        </p>

        <button className="home-btn-log">Login</button>
        <br></br>
        <button className="home-btn-sign">Sign Up</button>

        {props.authUser && props.authUser.email !== undefined && (
          <p>We have a logged in user: {props.authUser.email} </p>
        )}
      </div>
    </div>
  );
}
  

  

export default Home;