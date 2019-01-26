import React, {Component} from 'react';
import './App.css';
import AuthListComponent from './components/auth-list/AuthList';


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
                                <div className="container">
                                    <div className="row author-section">
                                        <div className="card col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                            <img src={authorOfDay.photo} className="card-img-top author-img" alt={authorOfDay.name}/>
                                            <div className="card-body">
                                                <h5 className="card-title">{authorOfDay.name}</h5>
                                                <a href="#" className="btn btn-primary">{this.state.interface.redirectToAuthor}</a>
                                            </div>
                                        </div>
                                        <div className="col-xs-0 col-sm-0 col-md-1 col-lg-1"/>
                                        <div className="card col-xs-12 col-sm-12 col-md-7 col-lg-7">
                                            <div className={"text-wrap portal"}>
                                                <h2>{this.state.interface.portal}</h2>
                                                {this.state.interface.desctiptionPortal}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <AuthListComponent authors={this.state.authors} interface={this.state.interface}/>

                            <nav className="navbar navbar-dark bg-dark container row team">

                                <div className={'collaborator-container col-xs-12 col-sm-6 col-md-4 col-lg'}>
                                    <a  href="https://github.com/DasneiN" target={"_blank"}><img
                                        src={'/assets/github/DasneiN.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container col-xs-12 col-sm-6 col-md-4 col-lg'}>
                                    <a  href="https://github.com/jrzlve" target={"_blank"}><img
                                        src={'/assets/github/jrzlve.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container col-xs-12 col-sm-6 col-md-4 col-lg'}>
                                    <a  href="https://github.com/KirillTK" target={"_blank"}><img
                                        src={'/assets/github/KirillTK.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container col-xs-12 col-sm-6 col-md-6 col-lg'}>
                                    <a  href="https://github.com/ogurez" target={"_blank"}><img
                                        src={'/assets/github/ogurez.jpg'} className={'collaborator'} alt={'name'}/></a>
                                    <span>Aleh Maskaliou</span>
                                </div>

                                <div className={'collaborator-container col-xs-12 col-sm-12 col-md-6 col-lg '}>
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
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
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
