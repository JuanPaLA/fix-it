import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './../App';
import Services from './../components/services/services';

const Routes = props => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path="/services" component={Services}/>        
      </Switch>
    </Router>
  );
};

export default Routes;