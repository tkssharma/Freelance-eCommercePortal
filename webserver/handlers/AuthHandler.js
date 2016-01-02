var User = require('../models/user')
	,MailHandler = require('./MainHandler');

var AuthHandler = function() {
	this.googleSignIn = googleSignIn;
	this.googleSignInCallback = googleSignInCallback;
	this.facebookSignIn = facebookSignIn;
	this.facebookSignInCallback = facebookSignInCallback;
	this.localSignIn = localSignIn;
	this.localSignInCallback = localSignInCallback;
	this.registerLocal = registerLocal;
	this.ResetPassword = ResetPassword;
	this.ResetPasswordCallback = ResetPasswordCallback;
	this.SignOut = SignOut;
};

function googleSignIn(req, res, next) {
	passport = req._passport.instance;
	passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/userinfo.email'}, function(err, user, info) {
	})(req,res,next);
}

function googleSignInCallback(req, res, next) {
	console.log(req.toString());
	passport = req._passport.instance;
	passport.authenticate('google',function(err, user, info) {
		if(err) {
			return next(err);
		}
		if(!user) {
			return res.redirect('http://localhost:8000');
		}
		User.findOne({email: user._json.email},function(err, usr) {
			res.writeHead(302, {
				'Location': 'http://localhost:8000/#/index?token=' + usr.token + '&user=' + usr.email
			});
			res.end();
		});
	})(req,res,next);
}

function facebookSignIn(req, res, next) {
	res.send('Facebook Login Successful');
}

function facebookSignInCallback(req, res, next) {
	console.log(req.toString());
	passport = req._passport.instance;
	passport.authenticate('facebook',function(err, user, info) {
		if(err) {
			return next(err);
		}
		if(!user) {
			return res.redirect('http://allakarte.herokuapp.com/#/welcome');
		}
		User.findOne({email: user._json.email},function(err, usr) {
			res.writeHead(302, {
				'Location': 'http://allakarte.herokuapp.com//#/welcome?token=' + usr.token + '&user=' + usr.email
			});
			res.end();
		});
	})(req,res,next);
}

function localSignIn(req, res, next) {
	if (req.user) {
		User.createToken(req.user.email, function(err, usersToken) {
			if (err) {
				res.json({success: false, message: 'Issue generating token'});
			} else {
				res.send({'success': true, token : usersToken});
			}
		});
	} else {
		res.json({success: false, message: 'AuthError'});
	}
}

function registerLocal(req, res, next) {
	console.log("Registering User");
	console.log(req.body);
	User.register(
		new User({
			username: req.body.email,
			email:req.body.email,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			city: req.body.city,
			role: req.body.role
		}), req.body.password, function(err){
			if(err) {
				console.log(err);
				console.log("Error Registering User");
				res.send("Not able to register user");
			}

			
			MailHandler.sendRegisterMail(req.body.email,true)
			res.send({'success': true});
		}
	);
}

function localSignInCallback(req, res, next) {}

function ResetPassword(req, res, next) {
	console.log(req.body);
	User.generateResetToken(req.body.email, function(err, user){
		console.log(user);
		MailHandler.sendResetPasswordToken(user);
	});
}

function ResetPasswordCallback(req, res, next) {
	console.log(req.body);
	console.log(req.body.email);
	console.log(req.body.access_token);
	User.findUserByResetToken(req.body.email, req.body.access_token, function(err, user){
		res.send(user);
	});
}

function SignOut(req, res, next) {
	console.log(req.body);
	if(req.user) {
		User.invalidateUserToken(req.body.email, function(err, user){
			console.log(req.body.email+ " successfully logged out");
		});
	}
}

module.exports = AuthHandler; 
