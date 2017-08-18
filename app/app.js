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
