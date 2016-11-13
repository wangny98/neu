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
		template : '<h3>�������ܹ�����Ӫ�����ϵͳ</h3>'
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
	
	vm.permissions = [
	                      	{	functionname: "useradmin",	operationname: "read",ticked: true	},
	                      	{	functionname: "useradmin",	operationname: "write",ticked: false	},
	                      	{	functionname: "productadmin",	operationname: "write",ticked: false	}
	                     ];
	
	vm.functions = [
	                      	{	functionname: "useradmin",ticked: true	},            
	                      	{	functionname: "productadmin",ticked: false	}
	                     ];

	vm.operations = [
                      	{	operationname: "read",ticked: true	},	            
                      	{	operationname: "write",ticked: false	}
                     ];	
	
	vm.operationsuser = [
                   	{	operationname: "user-read",ticked: true	},	            
                   	{	operationname: "write",ticked: false	}
                  ];	
	
	vm.operationsprouduct = [
                   	{	operationname: "product-read",ticked: true	},	            
                   	{	operationname: "write",ticked: true	}
                  ];	
	

	vm.updateUser = updateUser;
	vm.addPermission= addPermission;
	
	function addPermission(index){
		alert("add permission"+"index: "+index);
		alert("function[$index].functionname "+vm.functions[index].functionname);
		//alert("mynewoperations "+scope.mynewoperations );
		var usernewops=$scope.mynewoperations;
		alert("roles "+userewroles[0].rolename);
		//var usernewops=scope.mynewoperations;
		//alert("newoperations.operationname "+usernewops[0].operationname); 
		/*
		var length=vm.permissions.length;
		//alert("permission length:"+length);
		alert("newfuncationname: "+$scope.newfunction[0].functionname);
		vm.permissions[length].functionname=$scope.newfunction[0].functionname;
		vm.permissions[length].operationname=$scope.newoperation[0].operationname;
		$scope.permissions=vm.permissions;
		//vm.permissions[0].operationname="xxx";*/	
		}
	
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
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.roles = data.value;
		vm.roles[1].ticked=true;
	}).error(function(data) {
		alert('error');
		console.log("error:getrolelist");
	});

	

	function updateUser() {
		var strRoles = "";
		var usernewops=$scope.mynewoperations;
		alert("newop "+usernewops[0].operationname);
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



