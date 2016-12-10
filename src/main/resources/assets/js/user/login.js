
var ineuronApp = angular.module('ineuronApp', [ 'ngRoute', 'ngCookies','ui.bootstrap' ]);

ineuronApp.config(function($routeProvider) {

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

ineuronApp.controller('UserLoginController', ['$scope', '$http', '$location', '$cookies', '$rootScope', '$modal',
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
						$cookies.put('INeuron-UserName', $scope.username, {path : "/"});
						$cookies.put('INeuron-ApiToken',encodeURI(encodeURI(data.apiToken)), {path : "/"});
						
						var allPermissions = JSON.stringify(data.value.allPermissions); 
						var roleList = JSON.stringify(data.value.roleList);  
						$cookies.put('INeuron-roleList', roleList, {path : "/"});
						$cookies.put('INeuron-allPermissions', allPermissions, {path : "/"});
						
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


ineuronApp.controller('UserRegisterCtrl', ['$scope', '$rootScope', '$modal', '$http', '$location', 
	function($scope, $rootScope, $modal, $http, $location) {

	$scope.usernameCheck=function(){
		//alert("checkusername");
		$http({
			url : '/user/user?username=' + $scope.username,
			method : 'GET'
		}).success(function(data) {
			var user = data.value;
			if(user==null) $scope.existedUsername=false; 
			 else $scope.existedUsername=true;
		}).error(function(data) {
			alert('error');
			console.log("error to get user");
		});				
	}
	
	$scope.pwdConsistenceCheck=function(){
		if($scope.password!=$scope.password2) $scope.inconsistentPwd=true;
		else $scope.inconsistentPwd=false;
	}
	
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
			ineuronApp.confirm("提示","注册成功！请登录。", 'sm', $rootScope, $modal);		
			$location.path("/login");
			console.log("success!");

		}).error(function(data) {
			console.log("error");
		})
	};

}]);