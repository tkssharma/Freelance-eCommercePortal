var Mongoose = require("mongoose")
,Schema = Mongoose.Schema
,path = require('path')
,PassportLocalMongoose = require("passport-local-mongoose")
,Crypto = require("crypto")
,JWT = require("jwt-simple")
,CONFIG = require('../../config');

var Token = new Schema({
	token: {type: String},
	date_created: {type: Date, default: Date.now}
});

Token.statics.hasExpired= function(created) {
	var now = new Date();
	var diff = (now.getTime() - created);
	return diff > config.ttl;
};

var TokenModel = Mongoose.model('Token', Token);

var UserSchema =  new Schema(
		{
			firstname: {type: String, required: false}
		,lasttname: {type: String, required: false}
		,email: {type: String, required: true}
		,access_token: {type: String, required: false}
		,city: {type:String, required:false}
		,token: {type: Object}
		,date_created: {type: Date, default: Date.now}
		,reset_token: {type: String}
		,reset_token_expires_millis: {type: Number}
		,facebook_profile_id: {type: String, required: false}
		,google_profile_id: {type: String, required: false}
		}
);

UserSchema.plugin(PassportLocalMongoose);

UserSchema.statics.encode = function(data) {
	return JWT.encode(data, CONFIG.TOKEN_SECRET, 'HS256');
};

UserSchema.statics.decode = function(data) {
	return JWT.decode(data, CONFIG.TOKEN_SECRET);
};

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

UserSchema.statics.createToken = function(email, callback) {
	this.findOne({email: email}, function(err, usr) {
		if(err || !usr) {
			console.log('err');
		}
		//Create a token and add to user and save
		var token = this.model.encode({email: email});
		usr.token = new TokenModel({token:token});
		usr.save(function(err, usr) {
			if (err) {
				callback(err, null);
			} else {
				console.log("about to cb with usr.token.token: " + usr.token.token);
				callback(false, usr.token.token);//token object, in turn, has a token property :)
			}
		});
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

module.exports = Mongoose.model('User', UserSchema);
module.exports.Token = TokenModel;

