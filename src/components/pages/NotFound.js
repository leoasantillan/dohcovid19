import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import logo from '../../assets/images/stashaway.png';

const { Title, Text } = Typography;

const NotFound = () => (
  <div id="error-page">
    <div className="container">
      <img src={logo} alt="StashAway Logo" />
      <Title level={1}>404</Title>
      <Text>Sorry, we cant seem to find the page you are looking.</Text>
      <Link to="/">Go Back Home</Link>
    </div>
  </div>
);

export default NotFound;
