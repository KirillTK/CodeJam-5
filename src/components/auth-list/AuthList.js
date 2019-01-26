import React, {Component} from 'react';
import uuid from 'uuid/v4';
import './AuthList.css';


class AuthListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authors: this.props.authors.directors,
            interface: this.props.interface
        };

        this.classes = this.props.classes;
        this.findPerson = this.findPerson.bind(this);
    }


    render() {


        return (<div className={'AuthList'}>

                <section className={"container "}>

                    <div className={"author-search"}><input type="text" className="form-control form-control-lg "
                                                            placeholder={this.state.interface.searchInput}
                                                            onChange={this.findPerson}/></div>
                    <div className={"list"}>
                        {this.renderList()}
                    </div>
                </section>

            </div>
        )
    }


    findPerson(event) {

        let updatedList = this.state.authors;
        updatedList = updatedList.filter((item) => item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
        this.setState({items: updatedList});
    }

    renderList() {
        const items = this.state.items;
        const parent = [];
        parent.push(<ul  key={uuid()} className={"list-group"}/>);
        const childs = [];


        if (items) {
            items.forEach(item => {
                childs.push(<li key={uuid()} className={"list-group-item"}>{item.name}</li>);
            });
        } else {
            this.state.authors.forEach(item=> {
                childs.push(<li key={uuid()} className={"list-group-item"}>
                    {item.name}
                </li>);
            })
        }

        parent.push(childs);
        return parent;
    }
}


export default AuthListComponent;

