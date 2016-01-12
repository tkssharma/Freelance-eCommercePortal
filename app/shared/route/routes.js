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
		.state('welcome', {
			url: '/welcome',
			templateUrl: 'partials/welcome.html',
			onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
				if (! AuthenticationService.isLoggedIn()) {
					$state.go('login');
				};
			}]
		})
		.state(
			"login",
			{
				url : "/login",
				templateUrl : "partials/auth/login.html",
				onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
					if (AuthenticationService.isLoggedIn()) {
						$state.go('home');
					};
				}]
			})
		.state("signout", {
			url : "/signout",
			templateUrl : "partials/main.html",
			onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
				AuthenticationService.ClearCredentials();
				$state.go('login');
			}]
		})
		.state(
			"password",
			{
				url : "/password",
				templateUrl : "partials/auth/forgotpassword.html",
				onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
					if (AuthenticationService.isLoggedIn()) {
						$state.go('home');
					};
				}]

			})

		.state(
			"register",
			{
				url : "/register",
				templateUrl : "app/register/register.html",
				onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
					if (AuthenticationService.isLoggedIn()) {
						$state.go('home');
					};
				}]
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
		.state('about', {
			url: '/about',
			templateUrl: 'partials/about.html'
		})
		.state('team', {
			url: '/team',
			templateUrl: 'partials/team.html'
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


angular
.module('Codefun')
.run(
	[
	'$rootScope',
	'$location',
	'$stateParams',
	'$http',
	'$state',
	'$q',
	'AuthenticationService',
	'AUTH_EVENTS',
	function($rootScope, $location, $stateParams, $http,
		$state, $q,AuthenticationService,AUTH_EVENTS) {

		$rootScope
		.$on(
			'$stateChangeStart',
			function(event, toState, toParams,
				fromState, fromParams) {
				$(".page-loading")
				.removeClass("hidden");

			});

		$rootScope.$on('$stateChangeError', function(event,
			toState, toParams, fromState, fromParams) {

			$(".page-loading").addClass("hidden");

		});

		$rootScope
		.$on(
			'$stateChangeSuccess',
			function(event, toState, toParams,
				fromState, fromParams) {
				$rootScope.loading = false;
             // get user name on route change success
             $rootScope.isLoggedIn = AuthenticationService.isLoggedIn();
             $rootScope.currentUserName = AuthenticationService.getCurrentUser();
             console.log($rootScope.currentUserName)
             $(".page-loading").addClass("hidden");


         });

	} ])



