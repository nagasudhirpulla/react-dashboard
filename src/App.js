/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js
*/
import { Provider } from 'react-redux';
import configureStore from './store/index';
import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const store = configureStore();

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
