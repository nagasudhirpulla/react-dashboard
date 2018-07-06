import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();