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
		url : 'updateUser/{username}',
		views : {
			'' : {
				templateUrl : '/ineuron/user/updateUser.html',
				controller : 'UserUpdateController'
			}
		}
	}
	
	var updateRoleState = {
			name : 'updateRole',
			url : 'updateRole/:roleStr',
			templateUrl : '/ineuron/user/updateRole.html',
			controller : 'RoleUpdateController'

		}

	$stateProvider.state(userManagementState);
	$stateProvider.state(roleManagementState);
	$stateProvider.state(updateUserState);
	$stateProvider.state(updateRoleState);
	$stateProvider.state(aboutState);

});

mainApp.controller('NavMenuController', function($scope, $cookies) {
	
	var loginedUserStr=$cookies.get('INeuron-User');
	//var loginedUser = JSON.parse(loginedUserStr);  
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
	
	
	//Get the selected user
	alert("UI: "+username);
	$http({
		url : '/user/user',
		method : 'POST',
		data : username
	}).success(function(data) {
		//validateApiToken(data, $cookies);
		if (data.success == true) {
			var str = JSON.stringify(data.value.roles);  
			$cookies.put('INeuron-selectedUserRoles', str, {
				path : "/"
			});
			vm.userpermissions=data.value.permissionList;
			
			// set default value to permissions multi-select UI controls
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
		      //end of permission default set
		}
	}).error(function(data) {
		alert('error');
		console.log("error:getuser");
	});
	
	var selectedUserRolesStr=$cookies.get('INeuron-SelectedUserRoles');
	//var loginedUser = JSON.parse(loginedUserStr);  
	var selectedUserRoles = eval('(' + selectedUserRolesStr + ')');
	var strRole=selectedUserRoles.roles;
	
	/*
	for (var u in userList){
		if (userList[u].username==username){
			selectedUser=userList[u];
			break;
		}
	};
	*/
	
		
	// Get Rolelist and set user.roles
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.roles = data.value;
			
		for (var i in vm.roles){
			vm.roles[i].ticked=false;
			for (var j in selectedUser.roleList){
				//alert("j= "+j+", selectedUser.roleList[j].id "+selectedUser.username+selectedUser.roleList[j].id);
				if(vm.roles[i].id==selectedUser.roleList[j].id){
					vm.roles[i].ticked=true;
					break;
				}
			}
		}
	}).error(function(data) {
		alert('error');
		console.log("error:getrolelist");
	});

	
	vm.updateUser = updateUser;
	function updateUser() {
		
		// get updated roles
		var strRoles = "";
		for ( var i in $scope.newroles) {
			strRoles = strRoles.concat($scope.newroles[i].id, "|");
		};
		strRoles = strRoles.substring(0, strRoles.length - 1);

		alert("role: "+strRoles);
		
		// get updated permissions
		var strPer="";
		var empty=true;
		alert("start");
		
		if (typeof($scope.newuseradminops)!="undefined"){
			if (!empty) strPer=strPer.concat(",");
			strPer=strPer.concat("1:");
			for (var i in $scope.newuseradminops){
				strPer=strPer.concat($scope.newuseradminops[i].id, "|");
		};			
		strPer = strPer.substring(0, strPer.length - 1);
		empty=false;
		};
		
		if (typeof($scope.newprodadminops)!="undefined"){
		  if (!empty) strPer=strPer.concat(",");
			strPer=strPer.concat("2:");
			for (var i in $scope.newprodadminops){
				strPer=strPer.concat($scope.newprodadminops[i].id, "|");
		};			
		strPer = strPer.substring(0, strPer.length - 1);		 
		empty=false;
		};
		
		if (typeof($scope.neworderadminops)!="undefined"){
			  if (!empty) strPer=strPer.concat(",");
				strPer=strPer.concat("2:");
				for (var i in $scope.neworderadminops){
					strPer=strPer.concat($scope.neworderadminops[i].id, "|");
			};			
			strPer = strPer.substring(0, strPer.length - 1);		 
			empty=false;
			};

		
        alert("per "+strPer);
        
		$http({
			url : '/user/update',
			method : 'POST',
			data : {
				username : $scope.updateUsername,
				roles : strRoles,
				permissions: strPer
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
		/*if (data.success == true) {
			var str = JSON.stringify(data.value);  
			$cookies.put('INeuron-UserList', str, {
				path : "/"
			});
		};*/
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
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];
			// DTColumnDefBuilder.newColumnDef(4).notSortable() ];
	// vm.user2Add = _buildUser2Add(1);
	/*vm.addUser = addUser;
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
	}*/
});

mainApp.controller('RoleListController', function($http, $scope, $location,
		$cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.roles = data.value;
	}).error(function(data) {
		alert('error');
		console.log("error");
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2).notSortable() ];

	vm.addRole = addRole;
	vm.removeRole = removeRole;
	vm.updateRole = updateRole;

	function addRole(index) {
		// vm.users.push(angular.copy(vm.person2Add));
		// vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
		alert("add 1");
		alert("add" + vm.roles[index].rolename);
	}

	function removeRole(index) {
		alert("remove");
		alert(vm.roles[index].rolename);
	}
	
	function updateRole(index) {
		// vm.users.push(angular.copy(vm.person2Add));
		// vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);

		$state.go("updateRole", {roleStr: JSON.stringify(vm.roles[index])});
	}
});

mainApp.controller('RoleUpdateController', function($scope, $stateParams,
		$http, $state, $cookies) {
	var roleStr = $stateParams.roleStr;

	alert(roleStr);
		
	

});
