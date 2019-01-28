import React, { Component } from 'react';
import './App.css';
import AuthListComponent from './components/auth-list/AuthList';
import { Link } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      authors: null,
      interface: null
    };
  }

  componentDidMount() {
    this.loadData('ru');
  }

  render() {
    if (this.state.authors !== null && this.state.interface !== null) {
      const authorOfDay = this.getRandomAuthor();

      return (
        <div className="App">
          <header className="App-header">
            <nav className="navbar navbar-light bg-light">
              <h1>{this.state.interface.portal}</h1>
              <div>
                {
                  ["by", "eng", "ru"].map(v => (
                    <img key={v}
                      className="btn my-2 my-sm-0 flag"
                      src={'/assets/flags/' + v + '.png'}
                      onClick={this.setLanguage.bind(this, v)} alt={'flag'}
                      disabled={this.language === v} />
                  ))
                }
              </div>
            </nav>
          </header>

          <div className="container">
            <section className={"description"}>
              <div className="container">
                <div className="row author-section">
                  <div className="card col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <h6 className="text-center">{this.state.interface.manOfTheDay}</h6>
                    <img src={authorOfDay.photo} className="card-img-top author-img" alt={authorOfDay.name} />
                    <div className="card-body">
                      <h5 className="card-title">{authorOfDay.name}</h5>
                      <Link
                        to={`/Author/${authorOfDay.id}/${this.language}`}>{this.state.interface.redirectToAuthor}</Link>
                    </div>
                  </div>
                  <div className="col-xs-0 col-sm-0 col-md-1 col-lg-1" />
                  <div className="card col-xs-12 col-sm-12 col-md-7 col-lg-7">
                    <div className={"text-wrap portal"}>
                      <h2>{this.state.interface.portal}</h2>
                      <p>{this.state.interface.portalDescription}</p>
                      <Link to={"/list/" + this.language}>{this.state.interface.goToDirectorsList}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <AuthListComponent authors={this.state.authors} interface={this.state.interface} language={this.language} />

            <nav className="navbar navbar-dark bg-dark container team align-items-start py-4">
              <h2 className="text-center" style={{ width: "100%", color: "#fff" }}>{this.state.interface.team}</h2>
              <div className={'collaborator-container col-xs-12 col-sm-6 col-md-4 col-lg'}>
                <a href="https://github.com/DasneiN" target={"_blank"}><img
                  src={'/assets/github/DasneiN.jpg'} className={'collaborator'} alt={'name'} /></a>
                <span>Aleh Maskaliou</span>
              </div>

              <div className={'collaborator-container col-xs-12 col-sm-6 col-md-4 col-lg'}>
                <a href="https://github.com/jrzlve" target={"_blank"}><img
                  src={'/assets/github/jrzlve.jpg'} className={'collaborator'} alt={'name'} /></a>
                <span>Yaraslau Shybeka</span>
              </div>

              <div className={'collaborator-container col-xs-12 col-sm-6 col-md-4 col-lg'}>
                <a href="https://github.com/KirillTK" target={"_blank"}><img
                  src={'/assets/github/KirillTK.jpg'} className={'collaborator'} alt={'name'} /></a>
                <span>Kiryl Tkachou</span>
              </div>

              <div className={'collaborator-container col-xs-12 col-sm-6 col-md-6 col-lg'}>
                <a href="https://github.com/ogurez" target={"_blank"}><img
                  src={'/assets/github/ogurez.jpg'} className={'collaborator'} alt={'name'} /></a>
                <span>Viachaslau Lapitski</span>
              </div>

              <div className={'collaborator-container col-xs-12 col-sm-12 col-md-6 col-lg '}>
                <a href="https://github.com/Ronavea" target={"_blank"}><img
                  src={'/assets/github/Ronavea.jpg'} className={'collaborator'} alt={'name'} /></a>
                <span>Pavel Lushko</span>
              </div>
            </nav>
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

  getRandomAuthor() {
    return this.state.authors.directors[Math.floor(Math.random() * this.state.authors.directors.length)];
  }

  async getAuthorData(language) {
    return await fetch(`/data/directors/directors.${language}.json`).then(response => response.json()).then(value => value);
  }

  async getInterface(language) {
    return await fetch('/data/dictionary.json').then(response => response.json()).then(value => value[language]);
  }

  setLanguage(lang) {
    this.clearState();
    this.loadData(lang);
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

  clearState() {
    this.setState({ authors: null });
    this.setState({ interface: null });
  }

}

export default App;
