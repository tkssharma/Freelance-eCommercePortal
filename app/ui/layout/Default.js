'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {Button, message, Row, Col} from 'antd';
import Header from 'app/components/common/Header';
import Footer from 'app/components/common/Footer';

let DefaultLayout = (props) => {

	return (
		<div>
			<div className="header">
				<Header/>
			</div>
			{props.children}
			<div className="footer">
				<Footer/>
			</div>
		</div>
	)
}

export default DefaultLayout;
