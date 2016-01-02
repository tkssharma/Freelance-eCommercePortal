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
			},
			GOOGLE_AUTH: {
				GOOGLE_CLIENT_ID : "'295902945278-b3oqgi2daricc22mnnem3gca13q0ea12.apps.googleusercontent.com'",
				GOOGLE_SECRET_KEY : "rMT_E9TFqlSC9B497i9WTQS9",
				GOOGLE_CALLBACK_URL : "/api/users/google/callback"
			},
			FACEBOOK_AUTH: {
				FACEBOOK_CLIENT_ID : "1086250834720928",
				FACEBOOK_SECRET_KEY : "888f1a92dd4b0341e7b62b21d553704c",
				FACEBOOK_CALLBACK_URL: "/api/users/facebook/callback"
			},
			GMAIL_SMTP: {
				GMAIL_SMTP_EMAIL_ID : GMAIL_SMTP_EMAIL_ID,
				GMAIL_SMTP_PASSWORD : GMAIL_SMTP_PASSWORD
			},
			DEV_DOMAIN : "http://allakarte.herokuapp.com",
			TOKEN_SECRET: TOKEN_SECRET,
			MONGO_DB_URI: MONGO_DB_URI,
			RESET_TOKEN_IN_HOURS: RESET_TOKEN_IN_HOURS
		},
		'development' 					: {


		},
		'production'					: {


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

	var GOOGLE_CLIENT_ID = '295902945278-b3oqgi2daricc22mnnem3gca13q0ea12.apps.googleusercontent.com';
	var GOOGLE_SECRET_KEY = 'rMT_E9TFqlSC9B497i9WTQS9';
	var GOOGLE_CALLBACK_URL = '/api/users/google/callback';

	var FACEBOOK_APP_ID = '1086250834720928';
	var FACEBOOK_SECRET_KEY = '888f1a92dd4b0341e7b62b21d553704c';
	var FACEBOOK_CALLBACK_URL = '/api/users/facebook/callback';

	var DEV_DOMAIN = 'http://allakarte.herokuapp.com';

	var TOKEN_SECRET = 'awesomeallakarte';
//for Dev and production
var MONGO_DB_URI='mongodb://localhost:27017/myproject';
//var MONGO_DB_URI='mongodb://heroku_5j1k7dmw:ols1h2mmdeut9nl53i3j8cf466@ds045664.mongolab.com:45664/heroku_5j1k7dmw';

var RESET_TOKEN_IN_HOURS = 6;

var GMAIL_SMTP_EMAIL_ID = 'alacarte4313@gmail.com';
var GMAIL_SMTP_PASSWORD = 'alacarte2015';
