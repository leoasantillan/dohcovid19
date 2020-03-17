import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Menu, Drawer, Icon, Dropdown,
} from 'antd';
import logoWhite from '../../assets/images/stashaway_white.png';

const { SubMenu } = Menu;

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

function MenuList(props) {
  const { orientation } = props;

  return (
    <Menu mode={orientation} className="main">
      <Menu.Item key="home">
        Home
      </Menu.Item>
      <Menu.Item key="deposit">
        Manage Deposits
      </Menu.Item>
      <Menu.Item key="refer">
        Refer a Friend
      </Menu.Item>
      <Menu.Item key="support">
        Support
      </Menu.Item>

      {orientation === 'horizontal' ? (
        <Menu.Item>
          <Dropdown overlay={menu} placement="bottomRight">
            <span>
              Oliver
              <Icon type="down" />
            </span>
          </Dropdown>
        </Menu.Item>
      ) : (
        <SubMenu
          title={(
            <span className="submenu-title-wrapper">
              Oliver
              {' '}
              <Icon type="down" />
            </span>
          )}
        >
          {menu}
        </SubMenu>
      )}
    </Menu>

  );
}

class MainNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.onClose = this.onClose.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }

  onClose() {
    this.setState({
      visible: false,
    });
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <nav className="menu-bar">
        <div className="logo">
          <a href="/"><img src={logoWhite} alt="StashAway Logo" /></a>
        </div>
        <div className="menu-container">
          <div className="large">
            <MenuList orientation="horizontal" />
          </div>
          <Icon type="menu" className="drawer-button" onClick={this.showDrawer} />
          <Drawer
            placement="right"
            closable
            onClose={this.onClose}
            visible={visible}
            className="drawer-menu"
          >
            <MenuList orientation="inline" />
          </Drawer>
        </div>
      </nav>
    );
  }
}

MenuList.propTypes = {
  orientation: PropTypes.string,
};

MenuList.defaultProps = {
  orientation: null,
};

export default MainNavigation;
