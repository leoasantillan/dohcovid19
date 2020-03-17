import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Icon } from 'antd';

import MainNavigation from './MainNavigation';
import HeaderNavigation from './HeaderNavigation';

const { Title } = Typography;

class Header extends React.Component {
  componentDidMount() {
    document.title = 'StashAway Assignment';
  }

  render() {
    return (
      <header>
        <div className="container">
          <MainNavigation />
          <Link to="/" className="back">
            <Icon type="arrow-left" />
&nbsp;Overview
          </Link>
          <Title level={1}>General Investing</Title>
          <HeaderNavigation />
        </div>
      </header>
    );
  }
}

export default Header;
