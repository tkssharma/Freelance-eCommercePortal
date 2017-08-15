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
			className="navbar site-nav navbar-static-top navbar-transparent"
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
							src="images/logo.png"
							id="gennext-u"/>
						<img
							className="gennext-u hidden-lg hidden-md  gennext-u-slide-in-sm"
							alt="gennext U"
							title="gennext U"
							src="images/logo.png"
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

						<li
							className="dropdown open visible-lg visible-md visible-sm">
							<a href="#" data-toggle="dropdown" className="no-border dropdown-toggle">
								<div
									alt="User Thumbnail"
									className="userNavPic img-circle pull-left"></div>
								<span id="layoutUsername" className="name-position ng-binding"></span>
								<i className="fa fa-caret-down caret-position"></i>
							</a>

							<div
								id="userMenuPopup"
								className="popover bottom dropdown-menu user-menu"
								data-original-title=""
								title="">
								<div className="popover-inner col-md-12 ">
									<div className="col-md-12 col-sm-12 override-col-margin">
										<ul>
											<li>
												<a href="#/myaccount/myaccounttabs/password" className="no-border">
													<i className="fa fa-user medium-indent"></i>
													Edit Profile</a>
											</li>
											<li>
												<a href="#/myaccount/myaccounttabs/password" className="no-border">
													<i className="fa fa-cogs medium-indent"></i>
													Account</a>
											</li>
											<li>
												<a href="#/signout" className="no-border">
													<i className="fa fa-sign-out medium-indent"></i>
													Log Out</a>
											</li>
											<li>
												<a href="#/myaccount/myaccounttabs/password" className="no-border">
													<i className="fa fa-question-circle medium-indent"></i>
													FAQs</a>
											</li>

											<li>
												<a href="mailto:help@alakarte.com" className="no-border">
													<i className="fa fa-envelope-o medium-indent"></i>
													Contact Us</a>
											</li>
										</ul>
									</div>

								</div>
							</div>

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
