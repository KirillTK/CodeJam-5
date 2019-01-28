import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import RoutingPage from './components/Routing';


ReactDOM.render(<RoutingPage />, document.getElementById('root'));

serviceWorker.unregister();
