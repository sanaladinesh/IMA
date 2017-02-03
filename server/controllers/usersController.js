var Users = require("../models/users");
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports.create = function(req, res){
	console.log(req.body.data);

	var firstName = req.body.data.firstName;
	var lastName = req.body.data.lastName;
	var emailValue = req.body.data.emailValue;
	var passValue1 = req.body.data.passValue1;
	var passValue2 = req.body.data.passValue2;
	var phnNumValue = req.body.data.phnNumValue;
	var altPhnNumValue = req.body.data.altPhnNumValue;
	var currentCompany = req.body.data.currentCompany;
	var newCompanyName = req.body.data.newCompanyName;
	var newCompanyAddress1 = req.body.data.newCompanyAddress1;
	var newCompanyAddress2 = req.body.data.newCompanyAddress2;
	var newCompanyAddress3 = req.body.data.newCompanyAddress3;
	var newCompanyNum = req.body.data.newCompanyNum;
	var newCompanyEmail = req.body.data.newCompanyEmail;

	//Validation
	req.checkBody("data.firstName", "Name is required").notEmpty();
	req.checkBody("data.lastName", "Name is required").notEmpty();
	req.checkBody('data.emailValue', 'Email is required').notEmpty();
	req.checkBody('data.emailValue', 'Email is not valid').isEmail();
	req.checkBody('data.passValue1', 'Password is required').notEmpty();
	req.checkBody('data.passValue2', 'Passwords do not match').equals(req.body.data.passValue1);
	req.checkBody("data.phnNumValue", "Phone number is required").notEmpty();
	req.checkBody("data.altPhnNumValue", "Alternative phone number is required").notEmpty();
	req.checkBody("data.currentCompany", "Company name is required").notEmpty();
	req.checkBody("data.newCompanyName", "New company name is required").notEmpty();
	req.checkBody("data.newCompanyAddress1", "Company Address is required").notEmpty();
	req.checkBody("data.newCompanyAddress2", "Company Address is required").notEmpty();
	req.checkBody("data.newCompanyAddress3", "Company Address is required").notEmpty();
	req.checkBody("data.newCompanyNum", "Company Number is required").notEmpty();
	req.checkBody("data.newCompanyEmail", "Company Email is required").notEmpty();

	var errors = req.validationErrors();

	if( errors ){
		console.log("Errors..");
		return res.status(400).send({
		   message: 'This is an error!'
		});
	}else{
		console.log("No Errors..");
		var user = new Users({
			firstName: firstName,
			lastName: lastName,
			email: emailValue,
			password: passValue1,
			phoneNumber: phnNumValue,
			altPhoneNumber: altPhnNumValue,
			currentCompany: currentCompany,
			newCompanyName: newCompanyName,
			newCompanyAddress1: newCompanyAddress1,
			newCompanyAddress2: newCompanyAddress2,
			newCompanyAddress3: newCompanyAddress3,
			newCompanyNum: newCompanyNum,
			newCompanyEmail: newCompanyEmail
		});

		Users.createUser(user, function(err, user){
			if( err ){
				throw err;
			}
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');
	}
};

passport.use(new LocalStrategy( function(username, password, done) {
   	User.getUserByUsername(username, function(err, user){
	   	if(err) throw err;
	   	if(!user){
	   		return done(null, false, {message: 'Unknown User'});
	   	}

	   	User.comparePassword(password, user.password, function(err, isMatch){
	   		if(err) throw err;
	   		if(isMatch){
	   			return done(null, user);
	   		} else {
	   			return done(null, false, {message: 'Invalid password'});
	   		}
   		});
   	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  	User.getUserById(id, function(err, user) {
    	done(err, user);
  	});
});

module.exports.login = function(req, res){
	passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true})
};