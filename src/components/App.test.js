import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter routes={routes} />,
    div
);
  ReactDOM.unmountComponentAtNode(div);
});
