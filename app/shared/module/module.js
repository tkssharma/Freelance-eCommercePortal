/**
 * global declaration of all angular modules Modules related to resource design
 * can be added to this root module & should be added in every file
 *
 * @setting global module with ngRoute as Dependancy @ global custom directive @ added
 *          ui.bootstrap.modal to provide angular + bootstrap in built
 *          functionality
 * @UITK component for HTML form components
 */
(function() {
	angular.module('Codefun')

	.config(function ($httpProvider, $provide) {
		$provide.factory('httpInterceptor', function ($q, $rootScope, AUTH_EVENTS) {
			return {
				'request': function (config) {
					// intercept and change config: e.g. change the URL


					return config || $q.when(config);
				},
				'response': function (response) {
					// we can intercept and change response here...
					// broadcasting 'httpResponse' event
					//$rootScope.$broadcast('httpResponse', response);
					return response || $q.when(response);
				},
				'requestError': function (rejection) {
					// broadcasting 'httpRequestError' event
					//$rootScope.$broadcast('httpRequestError', rejection);
					return $q.reject(rejection);
				},
				'responseError': function (rejection) {
					$rootScope.$broadcast({
						401: AUTH_EVENTS.notAuthenticated,
						403: AUTH_EVENTS.notAuthorized,
						419: AUTH_EVENTS.sessionTimeout,
						440: AUTH_EVENTS.sessionTimeout
					}[rejection.status], rejection);
					return $q.reject(rejection);
				}
			};
		});

	});



})();
