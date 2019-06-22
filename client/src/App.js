import React, { Component } from 'react';
import './App.css';
// import { subscribe } from './api';
import AppStatusOverall from './components/AppStatusOverall';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppStatusOverall />
        </Provider>
      </div>
    );
  }
}

export default App;
