var mongoose = require('mongoose');
var	User = require('./models/user');
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var   GoogleStrategy = require('passport-google-oauth').OAuth2Strategy



module.exports = function(passport,config) {

	var self = this;

	// Config
	self.config     = config;

	// env
	self.env        = process.env.NODE_ENV || 'development';

	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	// Configuración del autenticado con Twitter
	passport.use(new TwitterStrategy({
		consumerKey		 : self.config.FACEBOOK_AUTH.FACEBOOK_CLIENT_ID,
		consumerSecret	: self.config.FACEBOOK_AUTH.FACEBOOK_SECRET_KEY,
		callbackURL		 : '/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {
		// Busca en la base de datos si el usuario ya se autenticó en otro
		// momento y ya está almacenado en ella
		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			// Si existe en la Base de Datos, lo devuelve
			if(!err && user!= null) return done(null, user);

			// Si no existe crea un nuevo objecto usuario
			var user = new User({
				provider_id	: profile.id,
				provider		 : profile.provider,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			//...y lo almacena en la base de datos
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));
	passport.use('google', new GoogleStrategy({
			clientID: self.config.GOOGLE_AUTH.GOOGLE_CLIENT_ID,
			clientSecret: self.config.GOOGLE_AUTH.GOOGLE_SECRET_KEY,
			callbackURL: self.config.DEV_DOMAIN + self.config.GOOGLE_AUTH.GOOGLE_CALLBACK_URL
	  	},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function () {
				User.findByGoogleProfileId(profile.id, function(err, usr){
					if(err)
						return done(err);
					if(usr) {
						return done(null, usr);
					} else {
						var UserToBeSaved = new User();
						UserToBeSaved.google_profile_id = profile.id;
						UserToBeSaved.access_token = accessToken;
						UserToBeSaved.name = profile.name.givenName +' '+ profile.name.familyName;
						UserToBeSaved.email = profile.emails[0].value;
						UserToBeSaved.save(function(err){
							if(err)
								throw err;
							return done(null, UserToBeSaved);
						});
					}
				});
			});
		}
	));

	passport.use(new FacebookStrategy({
		clientID			: self.config.FACEBOOK_AUTH.FACEBOOK_CLIENT_ID,
		clientSecret	: self.config.FACEBOOK_AUTH.FACEBOOK_SECRET_KEY,
		callbackURL	 : self.config.DEV_DOMAIN + self.config.FACEBOOK_AUTH.FACEBOOK_CALLBACK_URL,
		profileFields : ['id', 'displayName', /*'provider',*/ 'photos']
	}, function(accessToken, refreshToken, profile, done) {
		// El campo 'profileFields' nos permite que los campos que almacenamos
		// se llamen igual tanto para si el usuario se autentica por Twitter o
		// por Facebook, ya que cada proveedor entrega los datos en el JSON con
		// un nombre diferente.
		// Passport esto lo sabe y nos lo pone más sencillo con ese campo
		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			// Al igual que antes, si el usuario ya existe lo devuelve
			// y si no, lo crea y salva en la base de datos
			var user = new User({
				provider_id	: profile.id,
				provider		 : profile.provider,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));

};
