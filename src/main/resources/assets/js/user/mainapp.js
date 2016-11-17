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
	var selectedUserStr = $stateParams.userStr;
	//alert(selectedUserStr);
	//var loginedUser = JSON.parse(loginedUserStr);  
	var selectedUser = eval('(' + selectedUserStr + ')');
		
	$scope.updateUsername = selectedUser.username;

	var vm = this;
	vm.user=selectedUser;
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
	
	// set default value to permissions multi-select UI controls
	vm.userpermissions=selectedUser.permissionList;
	
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

		//alert("role: "+strRoles);
		
		// get updated permissions
		var strPer="";
		var empty=true;		
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
				strPer=strPer.concat("3:");
				for (var i in $scope.neworderadminops){
					strPer=strPer.concat($scope.neworderadminops[i].id, "|");
			};			
			strPer = strPer.substring(0, strPer.length - 1);		 
			empty=false;
			};

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
	
	vm.deleteUser=deleteUser;
	function deleteUser() {
		//alert(vm.users[index]);
		$http({
			url : '/user/delete',
			method : 'POST',
			data : {
				username : $scope.updateUsername
			}
		}).success(function(data) {
			validateApiToken(data, $cookies);
			$state.go("userManagement");
		}).error(function(data) {
			alert('error in delete');
			console.log("error");
		})
	}

});

mainApp.controller('UserListController', function($http, $scope, $location,
		$cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
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
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];
	
	vm.updateUser=updateUser;
	function updateUser(index) {
		//alert(vm.users[index]);
		$state.go("updateUser", {userStr: JSON.stringify(vm.users[index])});
	}
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
		$state.go("updateRole", {roleStr: JSON.stringify(vm.roles[index])});
	}
});

mainApp.controller('RoleUpdateController', function($scope, $stateParams,
		$http, $state, $cookies) {
	var roleStr = $stateParams.roleStr;
	var selectedRole = eval('(' + roleStr + ')');
		
	$scope.updateRolename = selectedRole.rolename;
	$scope.updateRoleDescription = selectedRole.description;

	var vm = this;
	
	vm.roleadminops = [
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
	
	// set default value to permissions multi-select UI controls
	vm.rolepermissions=selectedRole.permissionList;
	
	for (var upermissions_index in vm.rolepermissions){
		
		var funcStr=vm.rolepermissions[upermissions_index].function;
		var func=funcStr.split("|");
		var ops=vm.rolepermissions[upermissions_index].operations;
		
		switch(func[0]){
		case "1": // for 用户管理 function
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in vm.roleadminops){
					if(opid[0]==vm.roleadminops[u_index].id) {vm.roleadminops[u_index].ticked=true; break;}	
				};
			}
			break;
		case "2": // 产品管理 func
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in vm.prodadminops){
					if(opid[0]==vm.roleadminops[u_index].id) {vm.prodadminops[u_index].ticked=true; break;}	
				};
			}
		   break;
		case "3": // 订单管理 func
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in vm.orderadminops){
					if(opid[0]==vm.roleadminops[u_index].id) {vm.orderadminops[u_index].ticked=true; break;}	
				};
			}
		   break;		   
		};
		};
		
		vm.updateRole = updateRole;
		function updateRole() {
			// get updated permissions
			var strPer="";
			var empty=true;		
			if (typeof($scope.newroleadminops)!="undefined"){
				if (!empty) strPer=strPer.concat(",");
				strPer=strPer.concat("1:");
				for (var i in $scope.newroleadminops){
					strPer=strPer.concat($scope.newroleadminops[i].id, "|");
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
					strPer=strPer.concat("3:");
					for (var i in $scope.neworderadminops){
						strPer=strPer.concat($scope.neworderadminops[i].id, "|");
				};			
				strPer = strPer.substring(0, strPer.length - 1);		 
				empty=false;
				};

			$http({
				url : '/user/updaterole',
				method : 'POST',
				data : {
					id : selectedRole.id,
					rolename : $scope.updateRolename,
					description : $scope.updateRoleDescription,
					permissions: strPer
				}
			}).success(function(data) {
				validateApiToken(data, $cookies);
				$state.go("roleManagement");
			}).error(function(data) {
				alert('error');
				console.log("error");
			})
		}
		
		vm.deleteRole=deleteRole;
		function deleteRole() {
			//alert(vm.roles[index]);
			$http({
				url : '/user/deleterole',
				method : 'POST',
				data : {
					rolename : $scope.updateRolename
				}
			}).success(function(data) {
				validateApiToken(data, $cookies);
				$state.go("roleManagement");
			}).error(function(data) {
				alert('error in delete');
				console.log("error");
			})
		}

});
