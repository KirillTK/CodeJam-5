import React, {Component} from 'react';
import './App.css';
import AuthListComponent from './components/auth-list/AuthList';

const styles = {
    root: {
        flexGrow: 1,
    },
};


class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            authors: null,
            language: 'ru',
            interface: null
        };

        this.chooseByLanguage = this.chooseByLanguage.bind(this);
        this.chooseEngLanguage = this.chooseEngLanguage.bind(this);
        this.chooseRusLanguage = this.chooseRusLanguage.bind(this);
    }


    componentDidMount() {
      this.loadData();
    }

    componentWillUnmount() {
        if (this._asyncRequestForAuthors) {
            this._asyncRequestForAuthors.cancel();
        }

        if (this._asyncRequestForLanguage) {
            this._asyncRequestForLanguage.cancel();
        }
    }


    render() {

        if (this.state.authors !== null && this.state.interface !== null) {
            const authorOfDay = this.getRandomAuthor();
            console.log('favourite', authorOfDay, this.state.interface, this.state.language);


            return (
                <div className="App">

                    <header className="App-header">

                        <div className="container">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <a className="navbar-brand" href="#">{this.state.interface.portal}</a>


                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="#">{this.state.interface.team}<span
                                                className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">{this.state.interface.team}</a>
                                        </li>
                                    </ul>
                                </div>

                                <img className="btn my-2 my-sm-0 flag" src={'/assets/flags/by.png'}
                                     onClick={this.chooseByLanguage}/>
                                <img className="btn my-2 my-sm-0 flag" src={'/assets/flags/eng.png'}
                                     onClick={this.chooseEngLanguage}/>
                                <img className="btn my-2 my-sm-0 flag" src={'/assets/flags/ru.png'}
                                     onClick={this.chooseRusLanguage}/>
                            </nav>

                            <section className={"desctiption"}>

                                <div className="card">
                                    <img src={authorOfDay.photo} className="card-img-top author-img"
                                         alt={authorOfDay.name}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{authorOfDay.name}</h5>
                                        <a href="#"
                                           className="btn btn-primary">{this.state.interface.redirectToAuthor}</a>
                                    </div>
                                </div>

                                <div className={"text-wrap portal"}>
                                    <h1>{this.state.interface.portal}</h1>
                                    {this.state.interface.desctiptionPortal}
                                </div>

                            </section>

                            <AuthListComponent authors={this.state.authors}/>
                        </div>

                    </header>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <span>askdasd</span>
                    </header>
                </div>
            );
        }

    }

    getRandomAuthor() {
        return this.state.authors.directors[Math.floor(Math.random() * this.state.authors.directors.length)];
    }


    async getAuthorData() {
        return await fetch(`/data/directors/directors.${this.state.language}.json`).then(response => response.json()).then(value => value);
    }

    async getInterface() {
        return await fetch('/data/dictionary.json').then(response => response.json()).then(value => value[this.state.language]);
    }

    async chooseEngLanguage() {
        this.setState({language: 'eng'});
        this.loadData();
    }

    async chooseRusLanguage() {
        this.setState({language: 'ru'});
        this.loadData();
    }

    async chooseByLanguage() {
        this.setState({language: 'by'});
        this.loadData();
    }


    loadData() {
        this._asyncRequestForAuthors = this.getAuthorData().then(data => {
            console.log('here', data);
            this.setState({authors: data})
        });

        this._asyncRequestForLanguage = this.getInterface().then(data => {
            this.setState({interface: data});
        });
    }

}

export default App;
