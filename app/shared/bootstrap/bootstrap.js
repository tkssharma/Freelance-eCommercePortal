/* bootstrap  Angular app for fetching common resources
 * removed ng-app from index page to use manual bootstrap
 * @ bootstrap module added
 */

var myApplication = angular.module("Codefun", [ 'ui.router','ngCookies','ngResource','translate','oc.lazyLoad']);
var initInjector = angular.injector([ "ng" ]);
var $http = initInjector.get("$http");

angular
.element(document)
.ready(
		function() {
			//manual bootstrap angular root module
			// bootstrap app when DOM loaded
			angular.bootstrap(document,[ "Codefun" ]);

		});

myApplication
.controller(
		"parentCntl",
		[
		 "$scope",
		 "$rootScope",
		 "$state",
		 "$http",
		 "AuthenticationService",
		 "USER_ROLES",
		 '$timeout',
		 function parentCntl( $scope, $rootScope, $state,
				 $http,AuthenticationService,USER_ROLES,$timeout) {

			 $scope.currentUser = null;
			 $scope.userRoles = USER_ROLES;


		 } ])
		 .constant('AUTH_EVENTS', {
			 loginSuccess: 'auth-login-success',
			 loginFailed: 'auth-login-failed',
			 logoutSuccess: 'auth-logout-success',
			 sessionTimeout: 'auth-session-timeout',
			 notAuthenticated: 'auth-not-authenticated',
			 notAuthorized: 'auth-not-authorized',
			 loginmessage: ' invalid userid and password',
			 registermessage: 'unable to register user',
			 resetmessage: 'Reset password will be sent to your registered email id please check your email'
		 })
		 .constant('USER_ROLES', {
			 all: '*',
			 admin: 'admin',
			 guest: 'guest',
			 host: 'host'
		 });




