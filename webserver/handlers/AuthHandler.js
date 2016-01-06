var User = require('../models/user')
	,MailHandler = require('./MainHandler');

var AuthHandler = function() {
	this.googleSignIn = googleSignIn;
	this.googleSignInCallback = googleSignInCallback;
	this.facebookSignIn = facebookSignIn;
	this.facebookSignInCallback = facebookSignInCallback;
	this.localLogin = localLogin;
	this.localSignUp = localSignUp;
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

function localLogin(req, res, next) {

 passport.authenticate('local-login', function(err, user, info) {
     if (err) {return next(err);};

        if (user) {
            return res.json({token:user.generateJWT()});
        } else {
            return res.status(401).json(info);
        };

  })(req, res, next);
}

function localSignUp(req, res, next) {
	console.log("Registering callback");
    passport.authenticate('local-signup', function(err, user, info) {
     if (err) {return next(err);};

        if (user) {
            return res.json({token:user.generateJWT()});
        } else {
            return res.status(401).json(info);
        };
  })(req, res, next);

}


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
