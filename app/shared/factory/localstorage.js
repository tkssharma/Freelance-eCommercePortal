 // Localstorage service

	var app = angular.module('code-fun');

	app.factory('$localStorage', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			},
			remove: function(key){
				delete $window.localStorage[key];
			}
		}
	}]);

	  // Back button history
	app.run(['$location', '$rootScope', '$window','$URL','$http',
		function ($location, $rootScope,  $window, $URL, $http) {

			var history = [];

			$rootScope.$on('$routeChangeSuccess', function() {
				history.push($location.$$path);
			});

			$rootScope.back = function () {
				var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
				$location.path(prevUrl);
			};
			/* generate Slug for given string */
			$rootScope.generateSlug = function(string){

				if(!angular.isDefined(string)){
					return '';
				}

				return string
					.replace(/^\s\s*/, '') // Trim start
					.replace(/\s\s*$/, '') // Trim end
					.toLowerCase() // Camel case is bad
					.replace(/[^a-z0-9_\-~!\+\s]+/g, '') // Exchange invalid chars
					.replace(/[\s]+/g, '-'); // Swap whitespace for single hyphen
			};
	}]);
