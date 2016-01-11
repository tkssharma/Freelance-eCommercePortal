// app.js


var routerApp = angular.module("Codefun");

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
		.state('postlogin', {
			abstract : true,
			url: '/postlogin',
			templateUrl: 'partials/postlogin/main.html'
		})
		.state('postlogin.courses', {
			url: '/courses',
			templateUrl: 'partials/postlogin/courses.html'
		})
		.state('postlogin.codecast', {
			url: '/codecast',
			templateUrl: 'partials/postlogin/codecasts.html'
		})


		.state('authlogin', {
			url: '/authlogin',
			templateUrl: 'partials/auth/login.html'
		})
		.state('authregister', {
			url: '/authregister',
			templateUrl: 'partials/auth/register.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'partials/about.html'
		})
		.state('team', {
			url: '/team',
			templateUrl: 'partials/team.html'
		})
		.state('authpassword', {
			url: '/authpassword',
			templateUrl: 'partials/auth/forgotpassword.html'
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
	$urlRouterProvider.when("/postlogin","/postlogin/courses");
});
