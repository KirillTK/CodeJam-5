import React, {Component} from 'react';
import TimelineComponent from './components/Timeline';
import BigPicture from "react-bigpicture";
import './Auth.css';

class AuthPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authors: null,
      interface: null
    };
  }
  
  componentDidMount () {
      const pageProps = (this.props.location.pathname).split('/');
      this.currentLanguage = pageProps[3];
      this.currentAuthorId = pageProps[2];

      this.loadData(this.currentLanguage);
  }

  render() {
    if (this.state.authors !== null && this.state.interface !== null) {      
      
      return (
        <div className="container py-2 Auth">
          <div className="row justify-content-center">
            <h1 className="display-4 author__page__header">Роман Алексеевич Дервоед</h1>
          </div>
          <div className="row mt-4 justify-content-around">
            <div className="col-12 col-sm-8 col-md-4">
              <img src={this.currentAuthor.photo} alt="Author" className="img-fluid" />
            </div>
            <div className="col-12 col-sm-10 col-md-8">
              <h2>{this.state.interface.biografy}</h2>
              <TimelineComponent />
            </div>
          </div>
          <div className="row mt-4">
            <h2>{this.state.interface.photo}</h2>
          </div>
          <div className="row mt-4 video_container">
            <h2>{this.state.interface.video}</h2>

              <BigPicture
                  type="youtube"
                  src={this.currentAuthor.video}
              >
                  <img src="http://lorempixel.com/400/200/sports/3" alt={"Youtube overlay"}   className={"preview"} />
              </BigPicture>

          </div>
          <div className="row mt-4">
            <h2>{this.state.interface.map}</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" />
            </div>
          </header>
        </div>
      );
    }
  }

  loadData(language) {

    this.language = language;

    this._asyncRequestForAuthors = this.getAuthorData(language).then(data => {
      this.currentAuthor = data.directors[this.currentAuthorId];
      this.setState({ authors: data });
    });

    this._asyncRequestForLanguage = this.getInterface(language).then(data => {
      this.setState({ interface: data });
    });
  }

  async getInterface(language) {
    return await fetch('/data/dictionary.json').then(response => response.json()).then(value => value[language]);
  }

  async getAuthorData(language) {
    return await fetch(`/data/directors/directors.${language}.json`).then(response => response.json()).then(value => value);
  }
}

export default AuthPage;
