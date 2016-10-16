import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import App from './components/app';
import Statistics from './components/statistics';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
      <Route path="/statistics" component={Statistics} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
