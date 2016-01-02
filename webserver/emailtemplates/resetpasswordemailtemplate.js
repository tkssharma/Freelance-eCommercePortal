var CONFIG = require("../../config");

var ResetPasswordEmailTemplate = function(){

};

/**
 * @return {string}
 */
ResetPasswordEmailTemplate.prototype.EmailTemplate = function(email, token) {
	return "<h1>"+ CONFIG.DEV_DOMAIN+"/#/changepassword/"+email+"/"+token;
};


module.exports = new ResetPasswordEmailTemplate();
