import React, {Component} from 'react';
import './Auth.css';

class AuthPage extends Component {

    componentDidMount () {
        console.log('handle', this.props);
    }


    render() {
        console.log('handle2', this.props.location.pathname);
        return (
            <div className="Auth">
                This is Auth page
            </div>
        );
    }
}

export default AuthPage;
