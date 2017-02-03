var app = angular.module("imaApp", ["ngResource", "ngRoute"]);

app.bindDOM = function(){
	app.$body = $("body");
};

app.init = function(){


	app.config(function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({
	      enabled: true,
	      requireBase: false
	    });

		//Home: is About Us Route
	   	$routeProvider.when("/", {
	        templateUrl : "/views/home.html",
	        controller : "mainController"
	    }).when("/chooseus", {
	        templateUrl : "/views/chooseus.html",
	        controller : "mainController"
	    }).when("/projects", {
	        templateUrl : "/views/projects.html",
	        controller : "mainController"
	    }).when("/contactus", {
	        templateUrl : "/views/contactus.html",
	        controller : "mainController"
	    }).when("/signin", {
	        templateUrl : "/views/signin.html",
	        controller : "mainController"
	    }).when("/signup", {
	        templateUrl : "/views/signup.html",
	        controller : "mainController"
	    }).otherwise({
	        redirectTo: "/"
	    });
	});

	app.bindDOM();

};

app.init();



