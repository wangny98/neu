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
		template : '<h3>琥崧智能控制系统</h3>'
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

mainApp.controller('NavMenuController', function($scope, $cookies) {
	var userManagementMenu="用户管理";

	$scope.ShowUserManagementMenu = function() {
		/*
		 * var loginedUser=$cookies.get('INeuron-User'); for (var i in
		 * loginedUser.allPermissions){ var
		 * strFunc=loginedUser.allPermissions[i]; if
		 * (strFunc.indexOf(userManagementMenu)>=0) return true; else return
		 * false; }
		 */
		var username=$cookies.get('INeuron-UserName');
		if (username.indexOf("d")>=0) return true;
        
        return false;
	}
});

mainApp.factory('getUserData',function($http, $stateParams, $cookies, $q){
    return function(){
        var defer = $q.defer();
    	var username = $stateParams.username;
    	
        $http({
    		url : '/user/user',
    		method : 'POST',
    		data : 	username
    	}).success(function(data) {
    		validateApiToken(data, $cookies);
    		defer.resolve(data);
    		// var roleStr=user.roles;
    		//userAssignedRoles=user.roleList;
    		//alert(data.value.username);
    	}).error(function(data) {
    		// alert('error: get user by name');
    		defer.reject(data);
    		console.log("error:getuserbyname");
    	});
        return defer.promise
    }
});

mainApp.controller('UserUpdateController', function($scope, $stateParams,
		$http, $state, $cookies) {
	var username = $stateParams.username;
		
	$scope.updateUsername = $stateParams.username;

	var vm = this;
	
	vm.useradminops = [
	                   {	id: "1", operationname: "查询",ticked: false},	            
	                   {	id: "2", operationname: "编辑",ticked: false},	 
	                   {	id: "3", operationname: "打印",ticked: false},	 
	                   {	id: "4", operationname: "报表",ticked: false}
	                   ];	
	
	vm.prodadminops = [
	                   {	id: "1", operationname: "查询",ticked: false},	            
	                   {	id: "2", operationname: "编辑",ticked: false},	 
	                   {	id: "3", operationname: "打印",ticked: false},	 
	                   {	id: "4", operationname: "报表",ticked: false}
	                   ];
	
	vm.orderadminops=[
	                   {	id: "1", operationname: "查询",ticked: false},	            
	                   {	id: "2", operationname: "编辑",ticked: false},	 
	                   {	id: "3", operationname: "打印",ticked: false},	 
	                   {	id: "4", operationname: "报表",ticked: false}
	                   ];
	
		
	vm.userpermissions= [
	                     { function: "3|订单管理",
	                    	 operations: ["1|查询","2|编辑"]
	                     },
	                     { function: "1|用户管理",
	                       operations: ["1|查询", "2|编辑"]
	                     },
	                     { function: "2|产品管理",
	                    	 operations: ["1|查询","2|编辑","3|打印"]
	                     }
	                     ];
	
	for (var upermissions_index in vm.userpermissions){
		
		var funcStr=vm.userpermissions[upermissions_index].function;
		var func=funcStr.split("|");
		var ops=vm.userpermissions[upermissions_index].operations;
		
		switch(func[0]){
		case "1": // for 用户管理 function
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in vm.useradminops){
					if(opid[0]==vm.useradminops[u_index].id) {vm.useradminops[u_index].ticked=true; break;}	
				};
			}
			break;
		case "2": // 产品管理 func
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in vm.prodadminops){
					if(opid[0]==vm.useradminops[u_index].id) {vm.prodadminops[u_index].ticked=true; break;}	
				};
			}
		   break;
		case "3": // 订单管理 func
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in vm.orderadminops){
					if(opid[0]==vm.useradminops[u_index].id) {vm.orderadminops[u_index].ticked=true; break;}	
				};
			}
		   break;		   
		};
		};
	
	
	vm.updateUser = updateUser;
	vm.addPermission= addPermission;
	

	function addPermission(){
			
		}
	// alert("username: "+username);
	
	// Get user by name
	/*$http({
		url : '/user/user',
		method : 'POST',
		data : 	username
	}).success(function(data) {
		validateApiToken(data, $cookies);
		user = data.value;
		var roleStr=user.roles;
		userAssignedRoles=user.roleList;
		alert(userAssignedRoles[0].rolename);
	
	}).error(function(data) {
		// alert('error: get user by name');
		console.log("error:getuserbyname");
	});
    */
	//alert("role: "+vm.roles[0].rolename);
	
	//$scope.user=getUserData();
	//alert("vm.user "+$scope.user.username);
	
	//var user=$cookies.get('INeuron-UserName');
	// Get Rolelist
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(roledata) {
		validateApiToken(roledata, $cookies);
		vm.roles = roledata.value;
		//vm.roles[0].ticked=true;
		//defer.resolve(roledata);
		//defer.promise;
		/*for (var i in vm.roles){
			for (var j in userAssingedRoles){
				if(vm.roles[i].id==userAssignedRoles[j].id)
					vm.roles[i].ticked=true;
			}
		}*/
		// vm.roles[1].ticked=true;
	}).error(function(roledata) {
		alert('error');
		console.log("error:getrolelist");
	});
	
	//for (var i in $scope.roledata.value){
		//alert(vm.roles[i].rolename);
		//$scope.roles[i].ticked=true;
	//}
	//alert("roles "+$scope.roles[0].rolename);
	//$scope.user=getUserData();
	//alert($scope.user.value.username);

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
		for (var i in vm.users.roleList){
			vm.users.roles=vm.users.roles+vm.users.roleList[i];
		}
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
	// vm.user2Add = _buildUser2Add(1);
	vm.addUser = addUser;
	vm.removeUser = removeUser;

	function addUser(index) {
		// vm.users.push(angular.copy(vm.person2Add));
		// vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
		alert("add 1");
		alert("add" + vm.users[index].username);
	}

	function removeUser(index) {
		alert("remove");
		alert(vm.users[index].username);
	}
});



