import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from '../App';
import Author from '../pages/auth-page/Auth';

class RoutingPage extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/Author" component={Author}/>
                </div>
            </Router>
        );
    }
}

export default RoutingPage;
