var passport = require('passport');

function setup(app, handlers) {
	app.get('/api/users/google', passport.authenticate('google', {scope: ['email']}), handlers.auth.googleSignIn);
	app.get('/api/users/google/callback', passport.authenticate('google', {failureRedirect: '/login', session: false, scope: 'https://www.googleapis.com/auth/plus.login'}),  handlers.auth.googleSignInCallback);


	app.get('/api/users/facebook', passport.authenticate('facebook', { failureRedirect: '/login',successRedirect : '/welcome', session: false, scope: ['email'] }), handlers.auth.facebookSignIn);
	app.get('/api/users/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', session: false, scope: [] }), handlers.auth.facebookSignInCallback);
	app.post('/api/users/login', passport.authenticate('local', {session: false}), handlers.auth.localSignIn);
	//app.post('/api/users/logout', passport.authenticate('local', {session: false}), handlers.auth.SignOut);
	app.post('/api/users', handlers.auth.registerLocal);
	app.get('/auth/local/callback', handlers.auth.localSignInCallback);
	app.get('/user', handlers.user.getUsers);
	app.get('/user/:id', handlers.user.getUser);
	app.put('/user/:id', handlers.user.updateUser);
	app.get('/user/:first/:last/:email', handlers.user.createUser);
	app.post('/api/users/reset', handlers.auth.ResetPassword);
	app.post('/api/users/login/resetpassword', handlers.auth.ResetPasswordCallback);
	app.post('/api/users/signout', handlers.auth.SignOut);

	app.post('/api/createTraining', handlers.training.createTraining);
	app.get('/api/getAllTraining', handlers.training.getAllTraining);
	app.get('/api/getAllTrainingByTechnologyName/:technology', handlers.training.getAllTrainingByTechnologyName);

	app.post('/api/createYouTubeVideo', handlers.training.createYouTubeVideo);
	app.get('/api/getAllYouTubeVideos', handlers.training.getAllYouTubeVideos);
	app.get('/api/getAllYouTubeVideosByTechnologyName/:technology', handlers.training.getAllYouTubeVideosByTechnologyName);
	app.get('/api/getYouTubeVideosByCourseId/:course_id', handlers.training.getYouTubeVideosByCourseId);


	console.log("Successfully set up routes");
};

exports.setup = setup;
