/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/reducers/index.js

Using nested reducers in redux
https://stackoverflow.com/questions/36786244/nested-redux-reducers
*/
import {combineReducers} from 'redux';
import dashboard from './dashboard';

const rootReducer = combineReducers({
  // list of reducers here comma separated
  dashboard
});

export default rootReducer;