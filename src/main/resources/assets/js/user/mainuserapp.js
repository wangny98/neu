//define the package as userApp
var mainApp = angular.module('mainApp', [ 'ui.router', 'ngCookies',
		'datatables', 'isteven-multi-select' ]);

mainApp.config(function($stateProvider) {

	var userManagementState = {
		name : 'userManagement',
		url : 'userManagement',
		templateUrl : '/ineuron/user/list.html',
		controller : 'UserListController'
	}

	var aboutState = {
		name : 'about',
		url : '/about',
		template : '<h3>琥崧智能工厂运营与控制系统</h3>'
	}

	var updateUserState = {
		name : 'updateUser',
		url : 'updateUser/{username}',
		views : {
			'' : {
				templateUrl : '/ineuron/user/updateUser.html',
				controller : 'UserUpdateController'
			}
		}
	}

	$stateProvider.state(userManagementState);
	$stateProvider.state(updateUserState);
	$stateProvider.state(aboutState);

});

mainApp.controller('NavMenuController', function($scope) {
	$scope.ShowUserManagementMenu = function() {
		return true;
	}
});

mainApp.controller('UserUpdateController', function($scope, $stateParams,
		$http, $state, $cookies) {
	var username = $stateParams.username;
	$scope.updateUsername = $stateParams.username;

	var vm = this;

	//Get user by name
	$http({
		url : '/user/user',
		method : 'GET',
		data : {
			'username' : username
		}
	}).success(function(userdata) {
		validateApiToken(data, $cookies);
		$scope.user = userdata.value;
	}).error(function(userdata) {
		alert('error: get user by name');
		console.log("error:getuserbyname");
	});

	//Get Rolelist
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(roledata) {
		validateApiToken(data, $cookies);
		vm.roles = roledata.value;
	}).error(function(roledata) {
		alert('error');
		console.log("error:getrolelist");
	});

	vm.updateUser = updateUser;

	function updateUser() {
		var strRoles = "";
		var usernewroles = $scope.newroles;
		for ( var i in usernewroles) {
			strRoles = strRoles.concat(usernewroles[i].rolename, "|");
		}
		;
		strRoles = strRoles.substring(0, strRoles.length - 1);

		alert(strRoles);

		$http({
			url : '/user/update',
			method : 'POST',
			data : {
				username : $scope.updateUsername,
				role : $scope.updateRoleSelected
			}
		}).success(function(data) {
			validateApiToken(data, $cookies);
			$state.go("userManagement");

		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}

});

mainApp.controller('UserListController', function($http, $scope, $location,
		$cookies, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	$http({
		url : '/user/list',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.users = data.value;
	}).error(function(data) {
		alert('error');
		console.log("error");
	});

	//Get Rolelist
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(roledata) {
		validateApiToken(data, $cookies);
		vm.roles = roledata.value;
	}).error(function(roledata) {
		alert('error');
		console.log("error:getrolelist");
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable(),
			DTColumnDefBuilder.newColumnDef(4).notSortable() ];
	//vm.user2Add = _buildUser2Add(1);
	vm.addUser = addUser;
	vm.removeUser = removeUser;

	function addUser(index) {
		//vm.users.push(angular.copy(vm.person2Add));
		//vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
		alert("add 1");
		alert("add" + vm.users[index].username);
	}

	function removeUser(index) {
		alert("remove");
		alert(vm.users[index].username);
	}
});



