import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Services from './components/services/services';
import SignIn from './components/forms/signIn';
import SignUp from './components/forms/signUp';
import Quotes from './components/forms/quotes';
import Login from './components/forms/login';
import Jobs from './components/services/userJobs';
import MyQuotes from './components/services/myQuotes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//------------REDUX ELEMENTS------------//
import { Provider } from "react-redux";
import store from './redux/store';
import Budgets from './components/services/budgets';
import jwt_decode from "jwt-decode";
import setAuthToken from "../src/util/setAuthToken";
import { setCurrentUser, logoutUser } from "../src/redux/actions/authActions";
import PrivateRoute from "../src/routes/privateRoutes";



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

ReactDOM.render
(
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path="/sign-in" component={SignIn}/>
        <Route path="/sign-up" component={SignUp}/>
        <Route path="/login" component={Login}/>
        <Switch>
              <PrivateRoute exact path="/services" component={Services} />
              <PrivateRoute exact path="/budgets" component={Budgets} />
              <PrivateRoute exact path="/quotes/:id" component={Quotes} />
              <PrivateRoute path="/myquotes" component={MyQuotes} />
              <PrivateRoute path="/userjobs" component={Jobs}/>
        </Switch>
      </Switch>
    </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
