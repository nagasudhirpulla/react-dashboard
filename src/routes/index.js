/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/routes.js
*/
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

export default () => (
  <BrowserRouter>
    <Route path='/' component={Dashboard} />
  </BrowserRouter>
);