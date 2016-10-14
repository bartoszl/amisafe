import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import reducers from './reducers';

import App from './components/app';
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
