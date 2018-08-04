/*
Using connectedRouter for changing routes in redux actions
https://github.com/supasate/connected-react-router
*/
import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history'
import configureStore from './store/index';
import { loadDashboardFromAddress, updateStoreDashboards } from './actions/dashBoardActions'
import registerServiceWorker from './registerServiceWorker';
import qs from 'qs';

let filePath = qs.parse(window.location.search).filepath;
//console.log(filePath);

const history = createBrowserHistory()
const store = configureStore(history);

if (filePath !== undefined && filePath !== null) {
    // set dasbaord state based on the filePath
    store.dispatch(loadDashboardFromAddress(filePath));
} else {
    // set dasbaord state based on initial state
    store.dispatch(updateStoreDashboards(store.getState().dashboard));
}

render(
    <Provider store={store}>
        <Routes history={history} />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();