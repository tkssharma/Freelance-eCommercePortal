'use strict';

import React from 'react';
import {Link} from 'react-router';

let HomeComponent = function(props){
  return (
<div data-responsiveness-enabler="">
	<div className="super-header-wrapper section-inverse section-slim">
		<h1 className="h1-text">gennext Free Online Courses</h1>

		<div className="super-header image-homepage-banner">
			<div className="container">
				<div className="super-header-content row">
					<div className="col-xs-12 text-inverse">
						<div className="row row-gap-huge"></div>
						<div className="row row-gap-huge"></div>
						<section className="sliding-text-wrapper">
							<h1 className="stationary-text-top">Become a</h1>
							<div className="sliding-text">

								<h2>
									Full Stack Developer</h2>

							</div>
							<div className="row row-gap-medium">
								<div className="stationary-text-bottom">Online Training
									platform</div>
								<div className="row row-gap-huge"></div>
								<a href="#/login" ><span
									className="btn btn-primary btn-lg btn-min-width-sm">Start
										Learning</span></a>
										<a href="#/register"><span
									className="btn btn-primary btn-lg btn-min-width-sm">Create Account</span></a>
								<div className="row row-gap-huge"></div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>

);
}

export default HomeComponent;
