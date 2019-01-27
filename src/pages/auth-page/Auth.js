import React, {Component} from 'react';
import TimelineComponent from './components/Timeline';
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
          <div className="col-12 col-sm-10 col-md-8">
            <h2>Биография</h2>
            <TimelineComponent />
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

  loadData(language) {

    this.language = language;

    this._asyncRequestForAuthors = this.getAuthorData(language).then(data => {
      this.setState({ authors: data })
    });

    this._asyncRequestForLanguage = this.getInterface(language).then(data => {
      this.setState({ interface: data });
    });
  }
}

export default AuthPage;
