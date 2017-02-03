app.controller("mainController", ["$scope", "$resource", '$location', "$http", '$localStorage', 'Main', function($scope, $resource, $location, $http, $localStorage, Main){
	var AddUser = $resource("/api/createUser");
	var LoginUser = $resource("/api/loginUser");

	$scope.projsCount = 4989;
	$scope.createUser = function(){
		// var data = {
		// 	"firstName": $scope.firstNameValue,
		// 	"lastName": $scope.lastNameValue,
		// 	"emailValue": $scope.emailValue,
		// 	"passValue1": $scope.passValue1,
		// 	"passValue2": $scope.passValue2,
		// 	"phnNumValue": $scope.phnNumValue,
		// 	"altPhnNumValue": $scope.altPhnNumValue,
		// 	"currentCompany": $scope.currentCompany,
		// 	"newCompanyName": $scope.newCompanyName,
		// 	"newCompanyAddress1": $scope.newCompanyAddress1,
		// 	"newCompanyAddress2": $scope.newCompanyAddress2,
		// 	"newCompanyAddress3": $scope.newCompanyAddress3,
		// 	"newCompanyNum": $scope.newCompanyNum,
		// 	"newCompanyEmail": $scope.newCompanyEmail
		// };

		console.log(data);

		var data  = {
		    "email": $scope.emailValue,
		    "password": $scope.passValue1,
		    "given_name": $scope.firstNameValue,
		    "family_name": $scope.lastNameValue,
		    "clientId": "cmwebclient"
		}

		var req = {
			 method: 'POST',
			 url: 'https://auth.civilmaps.com/devapi/realms/civilmaps/signup',
			 headers: {
			   'Content-Type': "application/json"
			 },
			 data: data
		};

		$http(req).then(function(res){
			console.log(res);
			if (res.type == false) {
                alert(res.data)
            } else {
                $localStorage.token = res.data.token;
                window.location = "/"   
            }
		}, function(err){
			console.log(err);
			$scope.error = 'Failed to signup';
		});

		// var newUser = new AddUser();
		// newUser.data = data;
		// newUser.$save(
		// 	function(res, headers){
		//       //success callback
		//       console.log(res);
		//     },
		//     function(err){
		//       // error callback
		//       console.log(err);
		//   	}
		// );
	};

	$scope.logInUser = function(){
		var data = {
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
			 data: data
		};

		$http(req).then(function(res){
			console.log(res);
		}, function(err){
			console.log(err);
		});
		// var loginUser = new LoginUser();
		// loginUser.$save(
		// 	function(res, headers){
		//       //success callback
		//       console.log(res);
		//     },
		//     function(err){
		//       // error callback
		//       console.log(err);
		//   	}
		// );
	};
}]);