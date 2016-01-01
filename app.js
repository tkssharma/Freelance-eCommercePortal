/*jshint multistr: true ,node: true*/
"use strict";

var
	/* internal */
	CONFIG 			= require('./config.js'),
	WEBSERVER 		= require('./webServer/server.js');

(function() {
			var ws = new WEBSERVER(CONFIG);
				// web server start
				ws.start();
}());

