/**
 * 
 */
angular.module('Alacarte.food', ['Alacarte'])
.config(config);

	config.$inject = ['LoggerProvider'];
	function config(LoggerProvider) {
	
		LoggerProvider.enabled(true);
	
	}
