import React, {Component} from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import './Auth.css';

class AuthPage extends Component {

    componentDidMount () {
        console.log('handle', this.props);
    }


    render() {
        console.log('handle2', this.props.location.pathname);
        return (
          <div className="container py-2 Auth">
            <div className="row justify-content-center">
              <h1 className="display-4 author__page__header">Роман Алексеевич Дервоед</h1>
            </div>
            <div className="row mt-4 justify-content-around">
              <div className="col-12 col-sm-8 col-md-4">
                <img src="/data/directors/dervoed/photo.jpg" alt="Author" className="img-fluid"/>
              </div>
              <div className="col-12 col-sm-10 col-md-7">
                <h2>Biografy Timeline</h2>
              </div>
            </div>
            <div className="row mt-4">
              <h2>Фотографии</h2>
            </div>
            <div className="row mt-4">
              <h2>Видео</h2>
            </div>
            <div className="row mt-4">
              <h2>Памятные места</h2>
            </div>
          </div>
        );
    }
}

export default AuthPage;
