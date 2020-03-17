import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu className="dropdown-menu">
    <Menu.Item>
      User Option
    </Menu.Item>
    <Menu.Item>
      User Option
    </Menu.Item>
    <Menu.Item>
      User Option
    </Menu.Item>
  </Menu>
);

const HeaderNavigation = () => (
  <Menu mode="horizontal" className="header-navigation">
    <Menu.Item key="overview">
      Overview
    </Menu.Item>
    <Menu.Item key="assets">
      Assets
    </Menu.Item>
    <Menu.Item key="projection">
      Projection
    </Menu.Item>
    <Menu.Item key="about">
      About Portfolio
    </Menu.Item>
    <Dropdown overlay={menu} placement="bottomRight">
      <span>
        More Action
        <Icon type="down" />
      </span>
    </Dropdown>
  </Menu>
);


export default HeaderNavigation;
