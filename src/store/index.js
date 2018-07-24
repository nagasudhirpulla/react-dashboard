/*
Using connectedRouter for changing routes in redux actions
https://github.com/supasate/connected-react-router
*/
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers'
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router'

export default function configureStore(history) {
  return createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    /*rootReducer,
    applyMiddleware(thunk)*/
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk
      ),
    )
  );
}