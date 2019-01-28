import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../App';
import Author from '../pages/auth-page/Auth';
import AuthListComponent from './auth-list/AuthList';

class RoutingPage extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/list" component={AuthListComponent} />
          <Route path="/Author" component={Author} />
        </div>
      </Router>
    );
  }
}

export default RoutingPage;
