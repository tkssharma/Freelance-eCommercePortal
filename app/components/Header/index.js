import React, { PropTypes } from 'react'
import { Row, Col, Icon, Badge, Menu, Dropdown,Layout } from 'antd';
import './index.less'
import { Link } from 'react-router'

const contextTypes = {
  router: PropTypes.object.isRequired
};

const { Header } = Layout;

export default class CommonHeader extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {profile} = this.props
    let username = profile ? ( profile.get('name') ?  profile.get('name')  : '') : '';
    const menu = (
      <Menu>
        <Menu.Item>
          Dashboard
        </Menu.Item>
        <Menu.Item>
          Profile
        </Menu.Item>
        <Menu.Item>
          <a >Logout</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header>
        <Row type="flex" justify="end" align="middle">
          <Col span={3}>
            <Badge className="header-icon" count={5}>
              <a href="#">
                <Icon type="mail" />
              </a>
            </Badge>
            <Badge className="header-icon" dot>
              <a href="#">
                <Icon type="notification" />
              </a>
            </Badge>
          </Col>
          <Col span={3}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                <Icon type="user" /> {username} <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    )
  }
}

CommonHeader.contextTypes = contextTypes;
