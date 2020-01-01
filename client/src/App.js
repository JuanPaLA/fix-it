import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {Component} from 'react';
import './App.css';
import Logo from './facebook_cover_photo_1.png';
import Worker from './worker.jpg';
import User from './user.jpg';
import Nav2 from './components/nav/nav';
import Footer from './components/footer/footer';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Nav2 />
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <h4 style={{color: "black"}}>Find & Fix!</h4>
        
        <div className="text-center mt-3 shadow-sm border rounded-pill p-3" style={{backgroundColor:"white"}}>
          <em className="text-muted"><span style={{color:"black", fontSize:"1.2em"}}>Find a perfect fix, or a new job!</span></em>
        </div>
        
        <div>
          <h6  className="subheader" style={{color: "black"}}>
            What are you looking for?            
          </h6>
        </div>
       
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 " align="center">
            <img src={Worker} className="worker" alt="technician"/>
              <button type="button" className="btn btn-dark">
                <Link to="/workers">
                  <span style={{color:"white"}}>Need a Job!</span>
                </Link>
              </button>

            </div>
            <div className="col-6 " align="center">
            <img src={User} className="user" alt="user"/><br></br>
              <button type="button" className="btn btn-dark">
                <Link to='/services'>
                  <span style={{color: "white"}}>Need a Fix!</span>
                </Link>
              </button>
            </div>
          </div>
         </div>
      </header>

      <Footer/>        

    </div>
    )
  }
}

export default App;
