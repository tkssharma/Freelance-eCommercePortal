var Mongoose = require("mongoose")
,Schema = Mongoose.Schema
,path = require('path')
,PassportLocalMongoose = require("passport-local-mongoose")
,Crypto = require("crypto")
,JWT = require("jwt-simple");

var TrainingSchema =  new Schema(
		{
		 training_id: {type: String, required: false}
		,technologytype: {type: String, required: true}
		,technologyname: {type: String, required: true}
		,shortdescription: {type: String, required: false}
		,longdescription: {type: String, required: false}
		,logo: {type:String, required:false}

		}
);
Mongoose.model('Training', TrainingSchema);

