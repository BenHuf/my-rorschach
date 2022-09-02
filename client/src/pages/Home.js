import logo from '../assets/images/logo.svg'
import '../assets/stylesheets/App.css';

const Home = (props) => {
  

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to MyRorschach! Sign Up or Log In to Continue!!!!
          </p>
        </header>
      </div>
    );
  }
  

  

export default Home;