
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var UserSchema =  new  mongoose.Schema(
{
	username: {type: String, required: false}
	,hash: String
	,salt: String
	,date_created: {type: Date, default: Date.now}
	,reset_token: {type: String}
	,reset_token_expires_millis: {type: Number}
	,
	facebook: {
	id: String,
	token: String,
	email: String,
	name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
}
);



UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

	return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
	//expiration 60 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, 'SECRET');
};
var x = "";
UserSchema.statics.findUserByEmailId = function(email, callback) {
	this.findOne({email: email}, function(err, usr) {
		if(err || !usr) {
			callback(err, null);
		} else {
			callback(false, usr);
		}
	});
};


UserSchema.statics.findByFacebookProfileId = function(profileId, callback) {
	this.findOne({facebook_profile_id: profileId}, function(err, usr){
		if(err || !usr) {
			callback(err, null);
		} else {
			callback(false, usr);
		}
	});
};

UserSchema.statics.findByGoogleProfileId = function(profileId, callback) {
	this.findOne({google_profile_id: profileId}, function(err, usr){
		if(err || !usr) {
			callback(err, null);
		} else {
			callback(false, usr);
		}
	});
};

UserSchema.statics.findUser = function(email, token, callback) {
	this.findOne({email: email}, function(err, usr) {
		if(err || !usr) {
			callback(err, null);
		} else if (usr.token && usr.token.token && token === usr.token.token) {
			callback(false, usr);
		} else {
			callback(new Error('Token does not exist or does not match.'), null);
		}
	});
};



UserSchema.statics.invalidateUserToken = function(email, callback) {
	this.findOne({email: email}, function(err, usr) {
		if(err || !usr) {
			console.log('err');
		}
		usr.token = null;
		usr.save(function(err, usr) {
			if (err) {
				callback(err, null);
			} else {
				callback(false, 'removed');
			}
		});
	});
};

UserSchema.statics.generateResetToken = function(email, callback) {
	console.log("in generateResetToken....");
	this.findOne({email: email}, function(err, user) {
		if (err) {
			callback(err, null);
		} else if (user) {
			user.reset_token = Crypto.randomBytes(32).toString('hex');
			var now = new Date();
			var expires = new Date(now.getTime() + (CONFIG.RESET_TOKEN_IN_HOURS * 60 * 1000)).getTime();
			user.reset_token_expires_millis = expires;
			user.save();
			callback(false, user);
		} else {
			callback(new Error('No user with that email found.'), null);
		}
	});
};

UserSchema.statics.findUserByResetToken = function(email, resetToken, callback) {
	console.log("Reset Token: "+resetToken);
	this.findOne({reset_token: resetToken}, function(err, user){
		console.log("findOne...");
		if(err) {

			callback(new Error("Reset Token not found ..."), null);
		} else if (user) {

			var now = new Date();
			console.log(now.getTime());
			if(user.email == email &&  user.reset_token_expires_millis < now.getTime()) {

				user.setPassword("demo", function(){
					user.save();
					callback(false, user);
				});

				//callback(false, user);
			} else {
				callback(new Error("Reset Token is not valid anymore"), null);
			}
		}
	});
};

module.exports = mongoose.model('User', UserSchema);

