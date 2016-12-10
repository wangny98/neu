//define the package as ineuronApp
var ineuronApp = angular.module('ineuronApp', [ 'ui.router', 'ngCookies',
		'datatables', 'isteven-multi-select','ui.bootstrap','ui.sortable' ]);

ineuronApp.config(function($stateProvider) {

	var userManagementState = {
		name : 'userManagement',
		url : 'userManagement',
		templateUrl : '/ineuron/user/list.html'
	}
	
	var roleManagementState = {
			name : 'roleManagement',
			url : 'roleManagement',	
			templateUrl : '/ineuron/user/rolelist.html'
		}

	var aboutState = {
		name : 'about',
		url : '/about',
		template : '<h3>琥崧智能控制系统</h3>'
	}

	var updateUserState = {
		name : 'updateUser',
		url : 'updateUser/:userStr',
		templateUrl : '/ineuron/user/updateUser.html'
		}
	
	var updateRoleState = {
			name : 'updateRole',
			url : 'updateRole/:roleStr',
			templateUrl : '/ineuron/user/updateRole.html'
		}
	
	var createRoleState = {
			name : 'createRole',
			url : 'createRole',
			templateUrl : '/ineuron/user/createRole.html'
		}
	
	var createUserState = {
			name : 'createUser',
			url : 'createUser',
			templateUrl : '/ineuron/user/createUser.html'
		}

	var createProductCategoryState = {
			name : 'createProductCategory',
			url : 'createProductCategory',
			templateUrl : '/ineuron/product/createProductCategory.html'
		}
	
	var productCategoryManagementState = {
			name : 'productCategoryList',
			url : 'productCategoryList',
			templateUrl : '/ineuron/product/productCategoryList.html'
		}
	
	var updateProductCategoryState = {
			name : 'updateProductCategory',
			url : 'updateProductCategory/:productCategoryStr',
			templateUrl : '/ineuron/product/updateProductCategory.html'
		}
	
	var productManagementState = {
			name : 'productList',
			url : 'productList/:productCategoryStr',
			templateUrl : '/ineuron/product/productList.html'
		}
	
	var createProductState = {
			name : 'createProduct',
			url : 'createProduct',
			templateUrl : '/ineuron/product/createProduct.html'
		}
	
	
	var productAttributesState = {
			name : 'productAttributes',
			url : 'productAttributes/:productStr',
			templateUrl : '/ineuron/product/attributes.html'
		}
	
	var productManufacturingProcessState = {
			name : 'productManufacturingProcess',
			url : 'productManufacturingProcess/:productStr',
			templateUrl : '/ineuron/product/manufacturingprocess.html'
		}
	
	var formulaManagementState = {
			name : 'formulaList',
			url : 'formulaList',
			templateUrl : '/ineuron/product/formulaList.html'
		}
	
	var updateFormulaState = {
			name : 'updateFormula',
			url : 'updateFormula/:formulaStr',
			templateUrl : '/ineuron/product/updateFormula.html'
		}
	
	var createFormulaState = {
			name : 'createFormula',
			url : 'createFormula/',
			templateUrl : '/ineuron/product/createFormula.html'
		}

	$stateProvider.state(userManagementState);
	$stateProvider.state(roleManagementState);
	$stateProvider.state(updateUserState);
	$stateProvider.state(createUserState);
	$stateProvider.state(updateRoleState);
	$stateProvider.state(createRoleState);
	
	$stateProvider.state(productCategoryManagementState);
	$stateProvider.state(createProductCategoryState);
	$stateProvider.state(updateProductCategoryState);
	$stateProvider.state(productManagementState);
	$stateProvider.state(createProductState);
	$stateProvider.state(productAttributesState);
	$stateProvider.state(productManufacturingProcessState);
	$stateProvider.state(formulaManagementState);
	$stateProvider.state(updateFormulaState);
	$stateProvider.state(createFormulaState);
	
	$stateProvider.state(aboutState);

});

ineuronApp.controller('NavMenuController', ['$scope', function($scope) {
	
	$scope.hasPermission = function(funcId) {
		return hasPermission(funcId);
	}
	
}]);

ineuronApp.controller('LogoutController', ['$scope', '$cookies', function($scope, $cookies) {
	
	$scope.logout = function() {
		$cookies.remove("INeuron-ApiToken", {path : "/"});
		window.location.href = "/ineuron/user/index.html/#/login";
	}
	
}]);

