'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {
  Input,
  Col,
  Row,
  Select,
  InputNumber,
  DatePicker,
  AutoComplete,
  Cascader,
  Button
} from 'antd';
const InputGroup = Input.Group;
import {Link} from 'react-router';
import HeaderComp from 'app/components/common/Header';
import FooterComp from 'app/components/common/Footer';
import organisationSection from './organisation';
import technologiesSection from './technologies';
import courseSection from './courses';
import memeberSection from './memebers';
import workshopSection from './workshop';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state
      .user
      .get('profile')
  }
}
const mapDispatchToProps = dispatch => ({});

let Header_section = (
  <section className="hero ng-scope">
    <div className="container">
      <div className="logo-holder">
        <Link to="/auth/login"><img alt="Tech logo angular" src="images/angular.svg"/></Link>
        <Link to="/auth/login"><img alt="React" src="images/react.svg"/></Link>
        <Link to="/auth/login"><img alt="Js" src="images/javascript.svg"/></Link>
        <Link to="/auth/login"><img alt="Tech logo d3" src="images/d3.svg"/></Link>
        <Link to="/auth/login"><img alt="Es6" src="images/jss.svg"/></Link>
      </div>
      <h1 className="mega customtitle">GenNext Training to deliver project based
        learning to give you the head start you need as a developer</h1>
      <div className="ant-search-layout">

        <InputGroup compact>
          <Input
            defaultValue="Search Online course"/>
          <Button type="primary" icon="search">Search</Button>

        </InputGroup>
      </div>
    </div>

  </section>
);

let banner_section = (
  <div className="banner">
    <div className="bg-color">
      <div className="container">
        <div className="row">
          <div className="banner-text text-center">
            <div className="logo-holder">
              <Link to="/auth/login"><img alt="Tech logo angular" src="img/angular.svg"/></Link>
              <Link to="/auth/login"><img alt="React" src="img/react.svg"/></Link>
              <Link to="/auth/login"><img alt="Js" src="img/javascript.svg"/></Link>
              <Link to="/auth/login"><img alt="Tech logo d3" src="img/d3.svg"/></Link>
              <Link to="/auth/login"><img alt="Es6" src="img/jss.svg"/></Link>
            </div>
            <h1 className="mega customtitle">GenNext Training to deliver project based
              learning to give you the head start you need as a developer</h1>
            <div className="ant-search-layout">
              <InputGroup compact>
                <Input
                  defaultValue="Search Online course"/>
                <Button type="primary" icon="search">Search</Button>

              </InputGroup>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);

let Home = (props) => {

  return (
    <div>
      <div className="header">
        <HeaderComp/>
      </div>
      {banner_section}
      {organisationSection}
      {workshopSection}
      {technologiesSection}
      {courseSection}
      <div className="footer">
        <FooterComp/>
      </div>
    </div>
  )

}

const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(Home)

export default ConnectHome;
