import React from 'react';
import {
  Typography, Row, Col,
} from 'antd';

const { Text } = Typography;

const Footer = () => (
  <footer>
    <div className="container">
      <Row>
        <Col sm={24} md={18}>
          <Text type="secondary">
            Developed by&nbsp;
            <a href="https://www.linkedin.com/in/leoasantillan/" target="_blank" rel="noopener noreferrer">Leo Santillan</a>
&nbsp;for StashAway Front-End Engineer Assignment
          </Text>
        </Col>
        <Col sm={24} md={6} className="right">
          <Text type="secondary">
            Copyright &copy; 2020
          </Text>
        </Col>
      </Row>
    </div>
  </footer>
);

export default Footer;
