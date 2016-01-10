/*jshint multistr: true ,node: true*/
"use strict";

var
  /* 3rd Party */
	HTTP            = require('http'),
	UTIL            = require('util'),
	PATH            = require('path'),
	EXPRESS         = require('express'),
	MORGAN          = require('morgan'),
	BODY_PARSER     = require('body-parser'),
    MONGOOSE        = require( 'mongoose' ),
    CONFIG 			= require('../config'),
  /* internal */
	ERROR           = require('./error.js'),
	M               = require('./middlware'),
	AuthHandler = require('./handlers/AuthHandler'),
	TrainingHandler = require('./handlers/TrainingHandler'),
	passport = require('passport'),
	User = require('./models/user'),
	BodyParser = require("body-parser")
	,ExpressLogger = require("express-logger")
	,UrlEncode = require("urlencode")
	,MethodOverride = require("method-override")
	,CookieParser = require("cookie-parser")
	,Errorhandler = require("errorhandler")
	,session = require('express-session');

	require('./passport')(passport,CONFIG);


// ***************************************************************************************************************
// ***************************************************************************************************************

function webServer(config) {

	var self = this;

	// Config
	self.config     = config;

	// env
	self.env        = process.env.NODE_ENV || 'development';

	// Express app
	self.app        = EXPRESS();



	self.app.set('client-url','http://localhost:8000');
	self.app.set('client-google-signin','/google?action=signin');
	self.app.disable('x-powered-by');
	self.app.use(ExpressLogger({path: "./logfile.txt"}));
	self.app.use(BodyParser());
	self.app.use(MethodOverride());
	self.app.use(session({
		secret:'allcarte secret'
	}));
	self.app.use(CookieParser());
	self.app.use(EXPRESS.static(PATH.join(__dirname, '../')));


    self.app.use(passport.initialize());
    self.app.use(passport.session());

	// Create the database connection
	MONGOOSE.connect(self.config.WEBSERVER.DBURI);

	// When successfully connected
	MONGOOSE.connection.on('connected', function () {
	  console.log('Mongoose default connection open to ' + self.config.WEBSERVER.DBURI);
	});

	// If the connection throws an error
	MONGOOSE.connection.on('error',function (err) {
	  console.log('Mongoose default connection error: ' + err);
	});

	// When the connection is disconnected
	MONGOOSE.connection.on('disconnected', function () {
	  console.log('Mongoose default connection disconnected');
	});

	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', function() {
	  MONGOOSE.connection.close(function () {
	    console.log('Mongoose default connection disconnected through app termination');
	    process.exit(0);
	  });
	});

} // main function


// CORS middleware
webServer.prototype._setCors = function(req, res, next){
	res.header('Access-Control-Allow-Origin',   '*');
	res.header('Access-Control-Allow-Methods',  'GET, POST, OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,Content-Type,Accept,Pragma,Accept-Encoding,Accept-Language,Referer,Connection');
	next();
};



// Set Routes
webServer.prototype._setRoutes = function(handlers){
	var self = this;

	// set cors
	self.app.use(self._setCors);

    self.app.get('/', M.MainPage(self.config), function(req, res, next) {
		// Here we are passing first argument as request instead of request.query ... We need other data of request

		return res.status(200).json({
					status: 'success',
					message: "feedback has been successfully submitted"
				});
	});


	// search api
	self.app.get('/search', M.checkUserUUID(self.config), function(req, res, next) {
		// Here we are passing first argument as request instead of request.query ... We need other data of request

		return res.status(200).json({
					status: 'success',
					message: "feedback has been successfully submitted"
				});
	});


	var ApiRouter = EXPRESS.Router();
	var UserRouter = EXPRESS.Router({mergeParams: true});
	ApiRouter.use('/api/users/', UserRouter);

	//User Routes
	UserRouter.get('/google', passport.authenticate('google', {scope: ['email']}), handlers.auth.GoogleSignIn);
	UserRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: '/#/login', session: false, scope: 'https://www.googleapis.com/auth/plus.login'}), handlers.auth.GoogleSignInCallback);
	UserRouter.get('/facebook', passport.authenticate('facebook', { failureRedirect: '/login',successRedirect : '/welcome', session: false, scope: ['email'] }), handlers.auth.FacebookSignIn);
	UserRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', session: false, scope: [] }), handlers.auth.FacebookSignInCallback);
	UserRouter.post('/login',passport.authenticate('local', {session: false}), handlers.auth.LocalSignIn);
	UserRouter.post('/login/social', handlers.auth.LocalSignInWithSocial);
	UserRouter.post('/', handlers.auth.RegisterLocal);

    self.app.post('/api/createTraining', handlers.training.createTraining);
	self.app.get('/api/getAllTraining', handlers.training.getAllTraining);
	self.app.get('/api/getAllTrainingByTechnologyName/:technology', handlers.training.getAllTrainingByTechnologyName);

	self.app.post('/api/createYouTubeVideo', handlers.training.createYouTubeVideo);
	self.app.get('/api/getAllYouTubeVideos', handlers.training.getAllYouTubeVideos);
	self.app.get('/api/getAllYouTubeVideosByTechnologyName/:technology', handlers.training.getAllYouTubeVideosByTechnologyName);
	self.app.get('/api/getYouTubeVideosByCourseId/:course_id', handlers.training.getYouTubeVideosByCourseId);


	// STATIC FILES
	self.app.use(EXPRESS.static(PATH.join(__dirname, '../'))); // defines folder for static assets



	// catch 404 and forward to error handler
	self.app.use(function(req, res, next) {
	  var e = new Error(404); e.status = 404;
		return ERROR(e, req, res);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (self.app.get('env') === 'development') {
	  self.app.use(function(err, req, res, next) {
	    var e = new Error(500); e.status = err.status || 500;
		return ERROR(e, req, res);
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	self.app.use(function(err, req, res, next) {
	  var e = new Error(500); e.status = err.status || 500;
		return ERROR(e, req, res);
	});

};

webServer.prototype.start = function(){
	var self = this;


    var handlers = {
	auth: new AuthHandler(),
	training: new TrainingHandler()
    };

	// set routes first
	console.log("webServer.prototype.start :: Setting routes");
	self._setRoutes(handlers);

	console.log("webServer.prototype.start :: Creating HTTP Server");
	HTTP.createServer(self.app)
		.on('error', function(err) {
			console.log("webServer.prototype.start Error :"+ err);
			process.exit(1);
		})

		.listen(process.env.PORT || 5000 , function() {
			console.log("Listening on localhost on port " + self.app.get('port') + ' in ' + (process.env.NODE_ENV || 'development'));
	  });
}; //start


module.exports = webServer;
