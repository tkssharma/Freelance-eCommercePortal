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

	/*const popoverContent = (
		<div className="dropdown_container">
		<div className="avatar">
		<img
		src={Helper
			.user
			.avatar(props.user.get('avatar'))}
			alt={props
				.user
				.get('name')}/>
				</div>
				{props
					.user
					.get('userType') == 2
					? TrainerNavigation
					: UserNavigation
				}
				</div>
			);
			let user_profile = () => {
				if (props.user && (props.user.get('userType') === 1 || props.user.get('userType') === 2)) {
					return (
						<ul className="nav navbar-nav navbar-right">
						<li><a href="">Become Trainer</a></li>
						<li className="btn-trial"><Link to="/auth/login">{ props.user.get('name') } </Link></li>
						</ul>

					)
				} else {
					return (
						<ul className="nav navbar-nav navbar-right">
						<li><a href="">Become trainer</a></li>
						<li><Link to="/auth/login">SignIn</Link></li>
						<li className="btn-trial"><Link to="/auth/register">Sign Up</Link></li>
						</ul>
					);
				}

			}  */

	let UserNavigation = (

		<header
			className="navbar site-nav navbar-static-top navbar-transparent"
			role="navigation"
			style="background-color: #273b47;">
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
					role="navigation"
					style="height: 1px;">

					<ul className="nav navbar-nav navbar-right">

						<li >
							<a href="#/team">Technology</a>
						</li>
						<li ng-if="isLoggedIn === true">
							<a href="#/webcast">Codecasts</a>
						</li>
						<li >
							<a href="#/about">About</a>
						</li>
						<li ng-if="! isLoggedIn === true">
							<a id="catalog" className="dropdown-toggle" href="#/courses/all">Courses</a>
						</li>
						<li ng-if="isLoggedIn === true">
							<a id="catalog" className="dropdown-toggle" href="#/welcome">Courses</a>
						</li>

						<li
							ng-if="isLoggedIn === true"
							className="dropdown open visible-lg visible-md visible-sm">
							<a href="#" data-toggle="dropdown" className="no-border dropdown-toggle">
								<div
									alt="User Thumbnail"
									className="userNavPic img-circle pull-left"
									style="background-image: url('https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/p160x160/11012492_1046109752085971_4790600339148025262_n.jpg?oh=8586318f86ab46271837e5b965a7509d&oe=571F5EA6&__gda__=1457932208_79d5fbc5e3e57fa34e621cd8aabaec5d'); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;"></div>
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
										<ul style="padding-left: 0px">
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

						<li ng-if="! isLoggedIn === true">
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
