app.controller("projectsController", ['$scope', '$resource', '$location', '$http', '$localStorage', function($scope, $resource, $location, $http, $localStorage){
	$scope.logoutUser = function(){
		localStorage.removeItem("ngStorage-token")
		localStorage.removeItem("ngStorage-user")
		$location.path('/signin');
	};

	$scope.getDashboard = function(){
		$location.path('/dashboard');
	};

	$scope.getProfile = function(){
		$location.path('/profile');
	};

	$scope.getProjects = function(){
		$location.path('/projectlists');
	};

	$scope.getData = function(){
		$location.path('/data');
	};

	function getData(){
		$scope.token = $localStorage.token;

		var req = {
			 method: 'GET',
			 url: 'https://auth.civilmaps.com/devapi/realms/civilmaps/userprofile',
			 headers: {
			   'Authorization': "Bearer " + $localStorage.token
			 }
		};

		$http(req).then(function(res){
			console.log(res);
			$scope.user = { 
				"name":  res.data.UserAttributes[1].value,
				"company": "IMA Gass Station"
			};
			// var currentPageTemplate = $route.current.templateUrl;
			// $templateCache.remove(currentPageTemplate);
			// $route.reload();
			//$route.reload()
		}, function(err){
			console.log(err);
			if( err.data.message = "Invalid Token" ){
				$localStorage.token = "";
				$location.path('/signin');
			}
		});
	}

	getData();
}]);