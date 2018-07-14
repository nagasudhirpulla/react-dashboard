import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import { loadDashboardFromAddress, updateStoreDashboards } from './actions/dashBoardActions'
import registerServiceWorker from './registerServiceWorker';
import qs from 'query-string';

let filePath = qs.parse(window.location.search).filepath;
console.log(filePath);

const store = configureStore();

if (filePath !== undefined && filePath !== null) {
    // set dasbaord state based on the filePath
    store.dispatch(loadDashboardFromAddress(filePath));
} else {
    // set dasbaord state based on initial state
    store.dispatch(updateStoreDashboards(store.getState().dashboard));
}

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();