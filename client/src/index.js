import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Services from './components/services/services';
import SignIn from './components/forms/signIn';
import Quotes from './components/forms/quotes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//------------REDUX ELEMENTS------------//
import { Provider } from "react-redux";
import store from './redux/store';
import Budgets from './components/services/budgets';

ReactDOM.render
(
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path="/services" component={Services}/>        
        <Route path="/sign-in" component={SignIn}/>
        <Route path="/quotes/:subespecialidad" component={Quotes}/>
        <Route path="/budgets" component={Budgets}/>
      </Switch>
    </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
