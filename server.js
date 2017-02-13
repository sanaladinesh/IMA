var express = require("express");
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
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

app.get("/dashboard", function(req, res){
  res.sendfile(__dirname + "/client/index.html");
});

app.get("/profile", function(req, res){
  res.sendfile(__dirname + "/client/index.html");
});

app.get("/projectlists", function(req, res){
  res.sendfile(__dirname + "/client/index.html");
});

app.get("/data", function(req, res){
  res.sendfile(__dirname + "/client/index.html");
});

//REST APIs
//app.post("/api/createUser", usersController.create);
//app.post("/api/loginUser", usersController.login);

//Public Directories
app.use("/js", express.static(__dirname + "/client/js"));
app.use("/css", express.static(__dirname + "/client/css"));
app.use("/views", express.static(__dirname + "/client/views"));
app.use("/assets", express.static(__dirname + "/client/assets"));
app.use("/fonts", express.static(__dirname + "/client/assets/fonts"));

//Server Creation
app.listen(3000, function(){
	console.log("I am listening...");
});






