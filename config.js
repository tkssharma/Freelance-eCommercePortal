/*jshint multistr: true ,node: true*/
"use strict";


var config = {

	ENVIRONMENT 					: process.env.NODE_ENV || 'development',

	/* This is common config that will be loaded first
		After this the enviroment configs will be loaded and will overwrite these settings

		PUT settings here which are common for both envs
	*/
	COMMON 							: {

		WEBSERVER 					: {
			PORT 					: 3000,
			DBURI                   : 'mongodb://heroku_xgf1ghk8:u901lccncodu74h9012mn81eks@ds037185.mongolab.com:37185/heroku_xgf1ghk8'
		}
	},
	'development' 					: {

		REQUEST_POOL_SIZE 			: 15,
		REQUEST_USER_AGENT 			: '',

		ELASTICSEARCH 				: {
			BASEURL 				: 'http://localhost:9200',
			BASEURL_ES2 			: 'http://localhost:9201',
			SEARCH_STATS_BASEURL	: 'http://localhost:9200',

			INDEX 					: '',
			TYPE 					: '',

			AUTOSUGGEST_INDEX 		: '',
			AUTOSUGGEST_TYPE 		: '',

			INDEX_CREATION_SETTINGS : {
									    "settings" : {
									        "number_of_shards" : 5,
									        "number_of_replicas" : 1
									    }
									},
			SEARCH_INDEX			: 'search_statistics',

			NERDOMAIN 				: 'nerdomain',
		},
	    MYSQL_QUERY_TIMEOUT     : 60000 // milliseconds
	},
	'production'					: {

		REQUEST_POOL_SIZE 			: 100,
		REQUEST_USER_AGENT 			: '',

		ELASTICSEARCH 				: {
			BASEURL 				: 'http://127.0.0.1:8080', // nginx proxied
			BASEURL_ES2 			: '',
			SEARCH_STATS_BASEURL	: '',

			INDEX 					: 'catalog_alias',
			TYPE 					: 'product',

			AUTOSUGGEST_INDEX 		: '',
			AUTOSUGGEST_TYPE 		: '',

			INDEX_CREATION_SETTINGS : {
									    "settings" : {
									        "number_of_shards" : 5,
									        "number_of_replicas" : 1
									    }
									},
			SEARCH_INDEX			: 'search_statistics',

			NERDOMAIN 				: 'nerdomain',
		},
	    MYSQL_QUERY_TIMEOUT     : 60000 // milliseconds

	}
	/*
		Environment specific settings
		These will be loaded after common
	*/
};

var load = function(){
	var
		env 			= config.ENVIRONMENT,
		loadedConfig 	= config.COMMON;

	/* copy superficially , and not deep copy */
	Object.keys(config[env]).forEach(function(key) {
		loadedConfig[key] = config[env][key];
	});

	return loadedConfig;
};


module.exports = load();
