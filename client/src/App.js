import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppStatus from './components/AppStatus';
import AppDetail from './components/AppDetail';
import Error from './components/Error';
import store from './store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={AppStatus} />
              <Route path="/detail" component={AppDetail} />
              <Route component={Error} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
