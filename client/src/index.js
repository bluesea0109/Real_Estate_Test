import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'store';
import { API_BASE_URL } from 'utils/config';
import { getAuthToken } from 'utils/token';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { notification } from 'antd';
import 'styles/main.scss';

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (!config) {
    config = {};
  }

  if (token) {
    config.headers['Authorization'] = token;
  }

  return config;
});

notification.config({
  placement: 'bottomLeft',
  duration: 2,
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
