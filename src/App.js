import React, { Component } from 'react';
import Form from './Form';

import './App.css';
const API = 'http://localhost:8080/address';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showForm: false,
    };
    this.refresh = this.refresh.bind(this);
    this.showForm = this.showForm.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    fetch(API)
      .then((response) => response.json())
      .then((items) => this.setState({ items: items }));
  }

  showForm() {
    if (this.state.showForm) {
      this.setState({ showForm: false });
    } else {
      this.setState({ showForm: true });
    }
  }

  handleCheck(event) {
    event.preventDefault();
    let id = event.currentTarget.id;
    const requestOptions = {
      method: 'DELETE',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };
    let link = API + '/' + id;
    console.log(link);

    fetch(link, requestOptions).then((data) => this.refresh());
  }

  render() {
    const { showForm } = this.state;

    return (
      <div>
        <h1 className="title">Adressbok</h1>
        <div className="buttons">
          <button onClick={this.refresh}>refresh</button>
          <button onClick={this.showForm}>add Address</button>
        </div>
        {showForm && <Form refresh={this.refresh} />}
        <div className="list">
          <ul>
            {this.state.items.map(function (data, index) {
              return (
                <li className="address" key={index} data-id={data.id}>
                  <span onClick={this.handleCheck} className="close" id={data.id}>
                    &times;
                  </span>
                  <p>Id: {data.id}</p>
                  <p>Name: {data.firstname + ' ' + data.lastname}</p>
                  <p>PhoneNr: {data.phonenr}</p>
                  <p>Email: {data.email}</p>
                  <p>Country: {data.country}</p>
                  <p>Address: {data.address}</p>
                </li>
              );
            }, this)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
