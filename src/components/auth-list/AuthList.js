import React, { Component } from 'react';
import { Link } from "react-router-dom";
import uuid from 'uuid/v4';
import './AuthList.css';


class AuthListComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      language: this.props.language || (this.props.location.pathname).split('/')[2],
      interface: this.props.interface || null,
      // authors: this.props.authors.directors,
      authors: this.props.authors ? this.props.authors.directors : null,
    };

    console.log(this.state);

    this.findPerson = this.findPerson.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    if (!this.state.authors) {
      fetch(`./data/directors/directors.${this.state.language}.json`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(value => {
          this.setState({ authors: value.directors });
        });
    }

    if (!this.state.interface) {
      fetch(`./data/dictionary.json`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(value => {
          this.setState({ interface: value[this.state.language] });
        });
    }
  }

  render() {
    console.log(this.state);

    if (!this.state.authors || !this.state.interface) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    const innerPage = this.props.location && this.props.location.pathname.match('/list/');
    let header = '';

    if (innerPage) {
      header = <header className="header-inner">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h1><Link to="/"><small>{this.state.interface.portal}</small></Link></h1>
        </nav>
      </header>;
    }

    return (
      <div className={innerPage ? 'container' : ''}>
        {header}
        <div className="row py-4 AuthList">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">{this.state.interface.list}</h2>
              </div>
            </div>
            <div className="row">
              <section className="col-12">
                <div className={"author-search"}><input type="text" className="form-control form-control-lg "
                  placeholder={this.state.interface.searchInput}
                  onChange={this.findPerson} /></div>
                <div className={"list"}>
                  {this.renderList()}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }


  findPerson(event) {

    let updatedList = this.state.authors;
    updatedList = updatedList.filter((item) => item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
    this.setState({ items: updatedList });
  }

  renderList() {
    const items = this.state.items;
    const parent = [];
    parent.push(<ul key={uuid()} className={"list-group"} />);
    const childs = [];


    if (items) {
      items.forEach(item => {
        childs.push(<li key={uuid()} className={"list-group-item"}>
          <Link to={`/Author/${item.id}/${this.state.language}`}>{item.name}</Link></li>);
      });
    } else {
      this.state.authors.forEach(item => {
        childs.push(<li key={uuid()} className={"list-group-item"}>
          <Link to={`/Author/${item.id}/${this.state.language}`}>{item.name}</Link>
        </li>);
      })
    }

    parent.push(childs);
    return parent;
  }
}


export default AuthListComponent;
