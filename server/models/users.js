var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	firstName: {
		type: String
	},

	lastName: {
		type: String
	},

	email: {
		type: String,
		index:true
	},
	
	password: {
		type: String
	},

	phoneNumber: {
		type: String
	},

	altPhoneNumber: {
		type: String
	},

	currentCompany: {
		type: String
	},

	newCompanyName: {
		type: String
	},

	newCompanyAddress1: {
		type: String
	},

	newCompanyAddress2: {
		type: String
	},

	newCompanyAddress3: {
		type: String
	},

	newCompanyNum: {
		type: String
	},

	newCompanyEmail: {
		type: String
	}
});

module.exports = mongoose.model("user", UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function(username, callback){
	var query = {email: username};
	User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}