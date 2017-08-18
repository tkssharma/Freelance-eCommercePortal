'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Popover, Icon, Row, Col} from 'antd';
import * as Action from 'app/redux/actions';
import Helper from 'app/global/helper';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state
			.auth
			.get('user')
	}
}
const mapDispatchToProps = dispatch => ({});

let WWWHeader = (props) => {

	let UserNavigation = (

		<header
			className="navbar site-nav navbar-static-top"
			role="navigation">
			<div className="container">
				<div className="navbar-header">

					<button
						type="button"
						className="navbar-toggle collapsed"
						data-toggle="collapse"
						data-target="#navbar-collapse">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="logo navbar-brand" href="#/" id="header-logo">
						<img
							className="gennext-u  hidden-sm hidden-xs gennext-u-slide-in"
							alt="gennext U"
							title="gennext U"
							src="public/images/logo.png"
							id="gennext-u"/>
						<img
							className="gennext-u hidden-lg hidden-md  gennext-u-slide-in-sm"
							alt="gennext U"
							title="gennext U"
							src="public/images/logo.png"
							id="gennext-u"/>
					</a>

				</div>

				<nav
					className="navbar-collapse text-center-xs collapse"
					id="navbar-collapse"
					role="navigation">

					<ul className="nav navbar-nav navbar-right">

						<li >
							<a href="#/team">Technology</a>
						</li>
						<li>
							<a href="#/webcast">Codecasts</a>
						</li>
						<li >
							<a href="#/about">About</a>
						</li>
						<li >
							<a id="catalog" className="dropdown-toggle" href="#/courses/all">Courses</a>
						</li>
						<li>
							<a id="catalog" className="dropdown-toggle" href="#/welcome">Courses</a>
						</li>
						<li>
							<a data-toggle="modal" href="" data-target="#login">Sign In</a>
						</li>
					</ul>

				</nav>
			</div>
		</header>

	);

	return (
		<div>
			{UserNavigation}
		</div>
	);
}

const ConnectWWWHeader = connect(mapStateToProps, mapDispatchToProps)(WWWHeader)

export default ConnectWWWHeader;
