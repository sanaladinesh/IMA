app.controller("mainController", ['$scope', '$resource', '$location', '$http', '$window', '$localStorage', '$sessionStorage', '$rootScope', function($scope, $resource, $location, $http, $window, $localStorage, $sessionStorage, $rootScope){
	var AddUser = $resource("/api/createUser");
	var LoginUser = $resource("/api/loginUser");

	$scope.user = {};

	$scope.createUser = function(){
		var formData  = {
		    "email": $scope.emailValue,
		    "password": $scope.passValue1,
		    "given_name": $scope.firstNameValue,
		    "family_name": $scope.lastNameValue,
		    "phnNumValue": $scope.phnNumValue,
		    "altPhnNumValue": $scope.altPhnNumValue,
		    "currentCompany": $scope.currentCompany,
		    "newCompanyAddress1": $scope.newCompanyAddress1,
		    "newCompanyAddress2": $scope.newCompanyAddress2,
		    "newCompanyAddress3": $scope.newCompanyAddress3,
		    "newCompanyNum": $scope.newCompanyNum,
		    "newCompanyEmail": $scope.newCompanyEmail,
		    "clientId": "cmwebclient"
		};

		console.log(formData);

		var req = {
			 method: 'POST',
			 url: 'https://auth.civilmaps.com/devapi/realms/civilmaps/signup',
			 headers: {
			   'Content-Type': "application/json"
			 },
			 data: formData
		};

		$http(req).then(function(res){
			console.log(res);
			if (res.type == false) {
                alert(res.data);
            } else {
            	//$localStorage.token = res.data.token;
            	console.log(res);
                //window.location.pathname = "/dashboard"
                alert("You will recieve a email verification link, Follow that to complete the account creation process");
            }
		}, function(err){
			console.log(err);
			$scope.error = 'Failed to signup';
		});
	};

	$scope.logInUser = function(){
		var formData = {
		    "username": $scope.enteredEmail,
		    "password": $scope.enteredPassword,
		    "clientId": "cmwebclient"
		};

		var req = {
			 method: 'POST',
			 url: 'https://auth.civilmaps.com/devapi/realms/civilmaps/login',
			 headers: {
			   'Content-Type': "application/json"
			 },
			 data: formData
		};

		$http(req).then(function(res){
			console.log(res);
			//$sessionStorage.token = res.data.AuthenticationResult.AccessToken;
			$localStorage.token = res.data.AuthenticationResult.AccessToken;
            callDetails(res);
		}, function(err){
			console.log(err);
		});

		function callDetails(res){
			$location.path('/dashboard');

		}
	};

	$scope.logoutUser = function(){
		localStorage.removeItem("ngStorage-token")
		localStorage.removeItem("ngStorage-user")
		$location.path('/signin');
	};

	function init(){
		$scope.token = $localStorage.token;
		console.log($scope.token);
	}

	init();
}]);