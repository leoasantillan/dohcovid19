import React from 'react';
import {
  HashRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import '../assets/styles/index.scss';

import PageLayout from './partials/PageLayout';

import PortfolioBenchmark from './pages/PortfolioBenchmark';
import NotFound from './pages/NotFound';

const App = () => (
  <HashRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Redirect exact from="/" to="/portfolio-benchmark/" />
      <PageLayout exact path="/portfolio-benchmark/" component={PortfolioBenchmark} />
      <Route path="*" component={NotFound} />
    </Switch>
  </HashRouter>
);

export default App;
