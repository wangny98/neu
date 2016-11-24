//define the package as loginApp
var loginApp = angular.module('loginApp', [ 'ngRoute', 'ngCookies','ui.bootstrap' ]);

loginApp.config(function($routeProvider) {

	$routeProvider.when('/login', {

		templateUrl : '/ineuron/user/login.html',

		controller : 'UserLoginController'

	}).

	when('/register', {

		templateUrl : '/ineuron/user/register.html',

		controller : 'UserRegisterCtrl'

	}).

	otherwise({

		redirectTo : '/login'

	});

});

loginApp.controller('UserLoginController', ['$scope', '$http', '$location', '$cookies', '$rootScope', '$modal',
	function($scope, $http, $location, $cookies,$rootScope,$modal) {
		$scope.invalidUserPwd=false;
		
		$scope.login = function(isValid) {
			$http({
				url : '/user/authenticate',
				method : 'POST',
				data : {
					username : $scope.username,
					password : $scope.password
				}
			}).success(
				function(data) {
					if (data.success == true) {
						$cookies.put('INeuron-UserName', $scope.username, {
							path : "/"
						});
						var str = JSON.stringify(data.value);  
						$cookies.put('INeuron-User', str, {
							path : "/"
						});
						$cookies.put('INeuron-ApiToken',
								encodeURI(encodeURI(data.apiToken)), {
									path : "/"
								});
						window.location.href = "/ineuron/main.html";
					} else {
						//alert("不正确的用户名或者密码！");
						$scope.invalidUserPwd=true;
					}

				}).error(function(data) {
			alert(data.message+"error");
			console.log("error");
		})
	};

}]);


loginApp.controller('UserRegisterCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
	$scope.submitReg = function() {
		$http({
			url : '/user/register',
			method : 'POST',
			data : {
				username : $scope.username,
				firstname : $scope.firstname,
				lastname : $scope.lastname,
				password : $scope.password
			}
		}).success(function(data) {
			//alert(data.message);
			$location.path("/login");
			console.log("success!");

		}).error(function(data) {
			console.log("error");
		})
	};

}]);