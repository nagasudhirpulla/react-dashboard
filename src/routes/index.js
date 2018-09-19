/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/routes.js
*/
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import EditDashboard from '../components/EditDashboard';
import DashboardList from '../components/DashboardList';
import { ConnectedRouter } from 'connected-react-router'
/*
  <BrowserRouter>
    <Route path='/' component={Dashboard} />
  </BrowserRouter>
*/
export default (props) => (
  <ConnectedRouter history={props.history}>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route path='/edit/:id' component={EditDashboard} />
      <Route path='/dashboards' component={DashboardList} />
    </Switch>
  </ConnectedRouter>
);