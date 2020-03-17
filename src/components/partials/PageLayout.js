import React from 'react';
import { Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <div className="page">
        <Header />
        <Component {...matchProps} />
        <Footer />
      </div>
    )}
  />
);

PageLayout.propTypes = {
  component: PropTypes.objectOf(PropTypes.any),
};

PageLayout.defaultProps = {
  component: null,
};

export default PageLayout;
