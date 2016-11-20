//define the package as ineuronApp
var ineuronApp = angular.module('ineuronApp', [ 'ui.router', 'ngCookies',
		'datatables', 'isteven-multi-select','ui.bootstrap' ]);

ineuronApp.config(function($stateProvider) {

	var userManagementState = {
		name : 'userManagement',
		url : 'userManagement',
		templateUrl : '/ineuron/user/list.html',
		controller : 'UserListController'
	}
	
	var roleManagementState = {
			name : 'roleManagement',
			url : 'roleManagement',	
			templateUrl : '/ineuron/user/rolelist.html',
			controller : 'RoleListController'
		}

	var aboutState = {
		name : 'about',
		url : '/about',
		template : '<h3>琥崧智能控制系统</h3>'
	}

	var updateUserState = {
		name : 'updateUser',
		url : 'updateUser/:userStr',
		templateUrl : '/ineuron/user/updateUser.html',
		controller : 'UserUpdateController'
		}
	
	var updateRoleState = {
			name : 'updateRole',
			url : 'updateRole/:roleStr',
			templateUrl : '/ineuron/user/updateRole.html',
			controller : 'RoleUpdateController'
		}
	
	var createRoleState = {
			name : 'createRole',
			url : 'createRole',
			templateUrl : '/ineuron/user/createRole.html',
			controller : 'RoleCreateController'
		}

	$stateProvider.state(userManagementState);
	$stateProvider.state(roleManagementState);
	$stateProvider.state(updateUserState);
	$stateProvider.state(updateRoleState);
	$stateProvider.state(createRoleState);
	$stateProvider.state(aboutState);

});

ineuronApp.controller('NavMenuController', function($scope, $cookies) {
	
	var loginedUserStr=$cookies.get('INeuron-User');
	// var loginedUser = JSON.parse(loginedUserStr);  
	var loginedUser = eval('(' + loginedUserStr + ')');
	var allPermissions = loginedUser.allPermissions;
	$scope.ShowUserManagementMenu = function() {

		var userManagementMenu="用户管理";
		for (index in allPermissions){
			var permission = allPermissions[index];
	        var strFunc=permission.function;
	        if (strFunc.indexOf(userManagementMenu)>=0){
	        	return true;
	        }      	
	     }
        return false;
	}
	
	$scope.ShowRoleManagementMenu = function() {
		var roleManagementMenu="角色管理";
		for (index in allPermissions){
			var permission = allPermissions[index];
	        var strFunc=permission.function;
	        if (strFunc.indexOf(roleManagementMenu)>=0){
	        	return true;
	        }      	
	     }
        return false;
	}
});
