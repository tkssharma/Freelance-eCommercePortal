var constant = require("../../constants");

var ResetPasswordEmailTemplate = function(){

};

/**
 * @return {string}
 */
ResetPasswordEmailTemplate.prototype.EmailTemplate = function(email, token) {
	return "<h2>Dear User <br/> Please click on reset link to reset password</h2><h5>"+ constant.DEV_DOMAIN+"/#/changepassword/"+email+"/"+token;
};


module.exports = new ResetPasswordEmailTemplate();
