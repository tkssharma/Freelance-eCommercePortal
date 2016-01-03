// app.js


var routerApp = angular.module("Codefun", ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('home');
	
	$stateProvider

		// HOME STATES AND NESTED VIEWS ========================================
		.state('home', {
			url: '/home',
			templateUrl: 'partials/main.html'
		})
		.state('myaccount', {
			abstract : true,
			url: '/myaccount',
			templateUrl: 'partials/myaccount.html'
		})
		.state('myaccount.contact', {
			url: '/contact',
			templateUrl: 'partials/myaccount/contact.html'
		})
		.state('myaccount.password', {
			url: '/password',
			templateUrl: 'partials/myaccount/password.html'
		})
		.state('myaccount.course', {
			url: '/course',
			templateUrl: 'partials/myaccount/course.html'
		})
		.state('myaccount.certificates', {
			url: '/certificates',
			templateUrl: 'partials/myaccount/certificates.html'
		})
		.state('myaccount.employer', {
			url: '/employer',
			templateUrl: 'partials/myaccount/employer.html'
		})
		.state('myaccount.subscriptions', {
			url: '/subscriptions',
			templateUrl: 'partials/myaccount/subscriptions.html'
		})
		.state('myaccount.linkedacc', {
			url: '/linkedacc',
			templateUrl: 'partials/myaccount/linkedacc.html'
		})
		.state('myaccount.settings', {
			url: '/settings',
			templateUrl: 'partials/myaccount/settings.html'
		});
	
	$urlRouterProvider.when("/myaccount","/myaccount/contact"); 
});
