(function () {
	'use strict';
	angular.module('codefun').controller('loginController', loginController);

	loginController.$inject = ['$location', 'AuthenticationService','$scope','$rootScope','AUTH_EVENTS','$state','UserService'];
	function loginController($location, AuthenticationService,$scope,$rootScope,AUTH_EVENTS,$state,UserService) {
		$scope.user = {};
		var locationUrl = $location;
		var searchObject = locationUrl.search();
		if(searchObject["token"] && searchObject["user"]) {
			$(".page-loading").removeClass("hidden");
			$scope.user['email'] = searchObject["user"];
			$scope.user["token"] = searchObject["token"];
			AuthenticationService.LoginUsingToken($scope.user.email, $scope.user.token, function(response){
				if(response.success) {
					$(".page-loading").addClass("hidden");
					AuthenticationService.SetCredentials($scope.user.email, $scope.user.token);
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$state.go('welcome');
				} else {
					$(".page-loading").addClass("hidden");
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
					//FlashService.Error(response.message);
					$scope.loginerrormessage = "Failed to login in using other service providers";
				}
			});
		}


	}
})();
