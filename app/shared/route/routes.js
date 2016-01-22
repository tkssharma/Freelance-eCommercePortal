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
			abstract : true,
			templateUrl: 'partials/welcome/welcome.html'

		})
		.state('welcome.web', {
			url: '/web',
			templateUrl: 'partials/welcome/welcome_web.html',
			onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
				if (! AuthenticationService.isLoggedIn()) {
					$state.go('login');
				};
			}]
		})
		.state('welcome.java', {
			url: '/java',
			templateUrl: 'partials/welcome/welcome_java.html',
			onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
				if (! AuthenticationService.isLoggedIn()) {
					$state.go('login');
				};
			}]
		})
		.state('welcome.mobile', {
			url: '/mobile',
			templateUrl: 'partials/welcome/welcome_mobile.html',
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
						$state.go('welcome.web');
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
			"changepassword",
			{
				url : "/changepassword/:email/:token",
				templateUrl : "partials/auth/changepassword.html"
			})
		.state(
			"register",
			{
				url : "/register",
				templateUrl : "partials/auth/register.html",
				onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
					if (AuthenticationService.isLoggedIn()) {
						$state.go('welcome.web');
					};
				}]
			})
		.state('codecast', {
			url: '/codecast',
			templateUrl: 'partials/cast/codecast.html',
			onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
				AuthenticationService.ClearCredentials();
				$state.go('login');
			}]
		})
		.state('codecast.webcast', {
			url: '/webcast',
			templateUrl: 'partials/cast/webcast.html',
			onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
				AuthenticationService.ClearCredentials();
				$state.go('login');
			}]
		})


		.state('about', {
			url: '/about',
			templateUrl: 'partials/about.html'
		})
		.state('team', {
			url: '/team',
			templateUrl: 'partials/team.html'
		})
		.state('myaccount', {
			abstract : true,
			url: '/myaccount',
			templateUrl: 'partials/myaccount/myaccount.html'
		})
		.state('myaccount.myaccounttabs', {
			abstract : true,
			url: '/myaccounttabs',
			templateUrl: 'partials/myaccount/myaccounttabs.html'
		})
		.state('myaccount.myaccounttabs.password', {
			url: '/password',
			templateUrl: 'partials/myaccount/password.html'
		})
		;

		$urlRouterProvider.when("/myaccount","/myaccount/contact");
		$urlRouterProvider.when("/welcome","/welcome/web");
		$urlRouterProvider.when("/postlogin","/postlogin/courses");
		$urlRouterProvider.when("/myaccount",
			"/myaccount/myaccounttabs");
		$urlRouterProvider.when("/myaccount/myaccounttabs",
			"/myaccount/myaccounttabs/password");

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



