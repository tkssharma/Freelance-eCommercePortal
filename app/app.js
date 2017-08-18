	'use strict';

	import React from 'react';
	import {render} from 'react-dom';
	import {
		Router,
		Redirect,
		Route,
		Link,
		browserHistory,
		IndexRoute
	} from 'react-router';
	import {Provider} from 'react-redux';
	import store from 'app/redux/stores';
	import {syncHistoryWithStore} from 'react-router-redux'
	const history = syncHistoryWithStore(browserHistory, store);
 import  HomeComponent from 'app/components/home/index';
	import * as Action from 'app/redux/actions';
	import jwt from 'jsonwebtoken';

	if (localStorage.token) {
		API.setAuthToken(localStorage.token);
		store.dispatch(Action.authUpdateUserData(jwt.decode(localStorage.token)));
	}
	if (localStorage.geo) {
		// let geo = JSON.parse(localStorage.geo); API.setGeoLocation(geo);
		// 	store.dispatch(Action.wwwSetGeo(geo));
	}
	// ------------------Application Pages-------------//
	import AppLayout from 'app/ui/layout/Default';
	//--------------------Dashboard------------------//
	render((
		<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={AppLayout}>
				  <Route path="/home" component={HomeComponent}></Route>
				</Route>

			</Router>
		</Provider>
	), document.getElementById('root'));
