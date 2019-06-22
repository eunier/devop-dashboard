import React, { Component } from 'react';
import './App.css';
// import { subscribe } from './api';
import AppCard from './components/AppCards';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppCard />
        </Provider>
      </div>
    );
  }
}

export default App;
