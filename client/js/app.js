var app = angular.module("imaApp", ["ngResource", "ngRoute", "ngStorage"]);

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
	    }).when("/dashboard", {
	        templateUrl : "/views/dashboard.html",
	        controller : "dashboardController"
	    }).when("/profile", {
	        templateUrl : "/views/profile.html",
	        controller : "profileController"
	    }).when("/projectlists", {
	        templateUrl : "/views/projManagement.html",
	        controller : "projectsController"
	    }).when("/data", {
	        templateUrl : "/views/data.html",
	        controller : "dataController"
	    }).otherwise({
	        redirectTo: "/"
	    });
	});

};

app.init();



