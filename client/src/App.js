import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import './App.css';
import Logo from './facebook_cover_photo_1.png';
import Worker from './worker.jpg';
import User from './user.jpg';
// import Divisor from './line-divider3.png';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <h4>Find & Fix!</h4>
        
        <div className="text-center mt-3 shadow-sm border rounded-pill p-3" style={{backgroundColor:"lightorange"}}>
          <em className="text-muted">Find a perfect fix, or a new job!</em>
        </div>
        
        <div>
          <h6  className="subheader">
            Who are you?            
          </h6>
        </div>
       
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 " align="center">
            <img src={Worker} className="worker" alt="technician"/>
              <button type="button" className="btn btn-dark">
                <Link to="/workers">
                  Worker
                </Link>
              </button>

            </div>
            <div className="col-6 " align="center">
            <img src={User} className="user" alt="user"/><br></br>
              <button type="button" className="btn btn-dark">
                <Link to='/services'>
                  User
                </Link>
              </button>
            </div>
          </div>
         </div>
      </header>
    </div>
    )
  }
}

export default App;
