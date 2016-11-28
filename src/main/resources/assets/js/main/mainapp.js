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

	var createProductState = {
			name : 'createProduct',
			url : 'createProduct',
			templateUrl : '/ineuron/product/create.html',
			controller : 'ProductCreateController'
		}
	
	var productManagementState = {
			name : 'productList',
			url : 'productList',
			templateUrl : '/ineuron/product/list.html',
			controller : 'ProductListController'
		}
	
	var productManufacturingProcess = {
			name : 'productManufacturingProcess',
			url : 'productManufacturingProcess',
			templateUrl : '/ineuron/product/manufacturingprocess.html',
			controller : 'ProductManufacturingProcessController'
		}

	$stateProvider.state(userManagementState);
	$stateProvider.state(roleManagementState);
	$stateProvider.state(updateUserState);
	$stateProvider.state(updateRoleState);
	$stateProvider.state(createRoleState);
	
	$stateProvider.state(productManagementState);
	$stateProvider.state(createProductState);
	$stateProvider.state(productManufacturingProcess);
	
	$stateProvider.state(aboutState);

});

ineuronApp.controller('NavMenuController', ['$scope', '$cookies', function($scope, $cookies) {
	
	var allPermissionsStr=$cookies.get('INeuron-allPermissions');

	var allPermissions = eval('(' + allPermissionsStr + ')');
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
}]);

ineuronApp.controller('LogoutController', ['$scope', '$cookies', function($scope, $cookies) {
	
	$scope.logout = function() {
		$cookies.remove("INeuron-ApiToken", {path : "/"});
		window.location.href = "/ineuron/user/index.html/#/login";
	}
	
}]);

