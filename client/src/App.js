import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { subscribe } from './api';

class App extends Component {
  constructor(props) {
    super(props);

    subscribe(data => {
      this.setState({
        data
      });
    });
  }

  state = {
    data: 'no data yet'
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.data}</p>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
