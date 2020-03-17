import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createHistory } from 'history/createBrowserHistory';
import Store from './utils/Store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

render(
  <Provider store={Store}>
    <Router history={createHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);


serviceWorker.unregister();
