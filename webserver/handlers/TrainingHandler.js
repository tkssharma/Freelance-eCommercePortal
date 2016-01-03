var Mongoose = require("mongoose");
var settlement = require('../models/settlement');
require('../models/training');
require('../models/youtube');

var Youtube = Mongoose.model('Youtube');
var Training = Mongoose.model('Training');

var TrainingHandler = function() {
	// get training calls
	this.createTraining = createTraining;
	this.getAllTraining = getAllTraining;
	this.getAllTrainingByTechnologyName = getAllTrainingByTechnologyName;
    //get youtube video calls

    this.createYouTubeVideo = createYouTubeVideo;
    this.getYouTubeVideosByCourseId = getYouTubeVideosByCourseId;
    this.getAllYouTubeVideos = getAllYouTubeVideos;
	this.getAllYouTubeVideosByTechnologyName = getAllYouTubeVideosByTechnologyName;

	console.log("TrainingHandler  Set Up");
};



function createTraining(req,res,next) {
	console.log("Registering Training");
	console.log(req.body);

    var training = new Training();

    training.training_id = req.body.trainingid;
    training.technologytype= req.body.technologytype;
	training.technologyname = req.body.technologyname;
	training.shortdescription = req.body.shortdescription;
	training.longdescription = req.body.longdescription;
	training.logo = req.body.logo;

    training.save(function(err){
        if (err) {
        	return next(err);
        }
        res.send({'success': true});
    });
};

function getAllTraining(req,res,next) {
	Training.find({}, function (err, youtubevideos) {

		if (err) {return next(err);}
		else {
			res.send(youtubevideos);
		}
	});
};

function getAllTrainingByTechnologyName(req,res,next) {
	console.log(req.params.technology);
	Training.find({technologyname : req.params.technology}, function (err, training) {
		if (err) {return next(err);}
		else {
			res.send(training);
		}
	});
};

//..............................................





function createYouTubeVideo(req,res,next) {
	console.log("Registering Training");
	console.log(req.body);

    var youtube = new Youtube();

    youtube.course_name = req.body.coursename;
    youtube.link = req.body.link;
	youtube.description = req.body.description;
	youtube.shortdescription = req.body.shortdescription;
	youtube.longdescription = req.body.longdescription;
	youtube.logo = req.body.logo;

    youtube.save(function(err){
        if (err) {return next(err);}
        res.send({'success': true});
    });
};

function getAllYouTubeVideos(req,res,next) {
	Youtube.find({}, function (err, youtube) {
		if (err) {return next(err);}
		else {
			res.send(youtube);
		}
	});
};

function getYouTubeVideosByCourseId(req,res,next) {
	console.log(req.params.course_id);
	Youtube.find({course_id : req.params.course_id}, function (err, youtube) {
		if (err) {return next(err);}
		else {
			res.send(youtube);
		}
	});
};


function getAllYouTubeVideosByTechnologyName(req,res,next) {
	console.log(req.params.technology);
	Youtube.find({technology : req.params.technology}, function (err, youtube) {
		if (err) {return next(err);}
		else {
			res.send(youtube);
		}
	});
};


module.exports = TrainingHandler;

