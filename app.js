/*jshint multistr: true ,node: true*/
"use strict";

var
	/* internal */
	CONFIG 			= require('./config'),
	WEBSERVER 		= require('./webServer/server');

(function() {
			var ws = new WEBSERVER(CONFIG);
				// web server start
				ws.start();
}());

