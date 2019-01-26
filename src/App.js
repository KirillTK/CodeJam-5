import React, {Component} from 'react';
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

        this.chooseByLanguage = this.chooseByLanguage.bind(this);
        this.chooseEngLanguage = this.chooseEngLanguage.bind(this);
        this.chooseRusLanguage = this.chooseRusLanguage.bind(this);
    }


    componentDidMount() {
        this.loadData('ru');
    }

    componentWillUnmount() {
        // if (this._asyncRequestForAuthors) {
        //     console.log(this._asyncRequestForAuthors);
        //     this._asyncRequestForAuthors.cancel();
        // }
        //
        // if (this._asyncRequestForLanguage) {
        //     this._asyncRequestForLanguage.cancel();
        // }
    }


    render() {

        if (this.state.authors !== null && this.state.interface !== null) {
            const authorOfDay = this.getRandomAuthor();

            return (
                <div className="App">

                    <header className="App-header">

                        <div className="container">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <h1>{this.state.interface.portal}</h1>


                                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                </div>

                                <img className="btn my-2 my-sm-0 flag" src={'/assets/flags/by.png'}
                                     onClick={this.chooseByLanguage} alt={'flag'}/>
                                <img className="btn my-2 my-sm-0 flag" src={'/assets/flags/eng.png'}
                                     onClick={this.chooseEngLanguage} alt={'flag'}/>
                                <img className="btn my-2 my-sm-0 flag" src={'/assets/flags/ru.png'}
                                     onClick={this.chooseRusLanguage} alt={'flag'}/>
                            </nav>

                            <section className={"desctiption"}>

                                <div className="card">
                                    <h2 align="center">{this.state.interface.authorDay}</h2>
                                    <img src={authorOfDay.photo} className="card-img-top author-img"
                                         alt={authorOfDay.name}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{authorOfDay.name}</h5>
                                        <Link
                                            to={`/Author/${authorOfDay.id}/${this.language}`}>{this.state.interface.redirectToAuthor}</Link>
                                    </div>
                                </div>

                                <div className={"text-wrap portal"}>
                                    <h2>{this.state.interface.portal}</h2>
                                    {this.state.interface.desctiptionPortal}
                                </div>

                            </section>

                            <AuthListComponent authors={this.state.authors} interface={this.state.interface} language={this.language}/>


                            <nav className="navbar fixed-bottom navbar-light bg-dark container">

                                <div className={'collaborator-container'}>
                                    <a  href="https://github.com/DasneiN" target={"_blank"}><img
                                        src={'/assets/github/DasneiN.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container'}>
                                    <a  href="https://github.com/jrzlve" target={"_blank"}><img
                                        src={'/assets/github/jrzlve.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container'}>
                                    <a  href="https://github.com/KirillTK" target={"_blank"}><img
                                        src={'/assets/github/KirillTK.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container'}>
                                    <a  href="https://github.com/ogurez" target={"_blank"}><img
                                        src={'/assets/github/ogurez.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container'}>
                                    <a  href="https://github.com/Ronavea" target={"_blank"}><img
                                        src={'/assets/github/Ronavea.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>


                            </nav>

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


    async getAuthorData(language) {
        return await fetch(`/data/directors/directors.${language}.json`).then(response => response.json()).then(value => value);
    }

    async getInterface(language) {
        return await fetch('/data/dictionary.json').then(response => response.json()).then(value => value[language]);
    }

    chooseEngLanguage() {
        this.clearState();
        this.loadData('eng');
    }

    chooseRusLanguage() {
        this.clearState();
        this.loadData('ru');
    }

    chooseByLanguage() {

        this.clearState();
        this.loadData('by');

    }


    loadData(language) {

        this.language = language;

        this._asyncRequestForAuthors = this.getAuthorData(language).then(data => {
            this.setState({authors: data})
        });

        this._asyncRequestForLanguage = this.getInterface(language).then(data => {
            this.setState({interface: data});
        });
    }

    clearState() {
        this.setState({authors: null});
        this.setState({interface: null});
    }

}

export default App;
