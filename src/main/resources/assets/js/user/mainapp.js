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
		
	var loginedUserStr=$cookies.get('INeuron-User');
	// var loginedUser = JSON.parse(loginedUserStr);  
	var loginedUser = eval('(' + loginedUserStr + ')');
	vm.userpermissions=loginedUser.permissionList;
	
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
	
	// Get Rolelist and set user.roles
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.roles = data.value;
		  for (var i in vm.roles){
			for (var j in loginedUser.roleList){
				if(vm.roles[i].id==loginedUser.roleList[j].id)
					vm.roles[i].ticked=true;
			}
		}
	}).error(function(roledata) {
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



