var express = require("express");
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require("mongoose");
var db = mongoose.connection;
var usersController = require("./server/controllers/usersController");

mongoose.connect("mongodb://localhost:27017/IMA");

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Handling Routes
app.get("/", function(req, res){
	res.sendfile(__dirname + "/client/index.html");
});

app.get("/chooseus", function(req, res){
	res.sendfile(__dirname + "/client/index.html");
});

app.get("/projects", function(req, res){
	res.sendfile(__dirname + "/client/index.html");
});

app.get("/contactus", function(req, res){
	res.sendfile(__dirname + "/client/index.html");
});

app.get("/signin", function(req, res){
	res.sendfile(__dirname + "/client/index.html");
});

app.get("/signup", function(req, res){
	res.sendfile(__dirname + "/client/index.html");
});

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//REST APIs
app.post("/api/createUser", usersController.create);
app.post("/api/loginUser", usersController.login);

//Public Directories
app.use("/js", express.static(__dirname + "/client/js"));
app.use("/css", express.static(__dirname + "/client/css"));
app.use("/views", express.static(__dirname + "/client/views"));

//Server Creation
app.listen(3000, function(){
	console.log("I am listening...");
});