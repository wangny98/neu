

ineuronApp.controller('UserUpdateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal', 
	function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	var selectedUserStr = $stateParams.userStr;
	// alert(selectedUserStr);  
	var selectedUser = eval('(' + selectedUserStr + ')');
		
	$scope.updateUsername = selectedUser.username;

	var vm = this;
	vm.user=selectedUser;
	vm.funcs = ineuronFuncs.getFuncs();
	
	// set default value to permissions multi-select UI controls
	vm.userpermissions=selectedUser.permissionList;
	
	for (var upermissions_index in vm.userpermissions){
		
		var func=vm.userpermissions[upermissions_index].function;
		var ops=vm.userpermissions[upermissions_index].operations;
		
		var definedFunc = ineuronFuncs.getFunc(func);
		if(definedFunc != null){
			var definedOps = definedFunc.ops;
			for (var op_index in ops){
				var opid=ops[op_index];
				for (var u_index in definedOps){
					if(opid==definedOps[u_index].id) {
						definedOps[u_index].ticked=true; 
						break;	
					}
				}
			}
		}

	}
    
	// end of permission default set
	
		
	// Get Rolelist and set user.roles
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.roles = data.value;
			
		for (var i in vm.roles){
			vm.roles[i].ticked=false;
			for (var j in selectedUser.roleList){
				// alert("j= "+j+", selectedUser.roleList[j].id
				// "+selectedUser.username+selectedUser.roleList[j].id);
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

		// get updated permissions
		var strPer="";
		for(var i in vm.funcs) {
			var func = vm.funcs[i];
			if(func.output.length > 0){
				var strOps = "";
				for(var j in func.output){
					var ops = func.output[j];
					strOps = strOps.concat(ops.id, "|");
				}
				strPer = strPer.concat(func.id, ":", strOps, ",");
			}			
					
		}	
			
		$http({
			url : '/user/update',
			method : 'POST',
			data : {
				username : $scope.updateUsername,
				roles : strRoles,
				permissions: strPer
			}
		}).success(function(data) {
			validateApiToken(data, $cookies, $rootScope, $modal);
			$state.go("userManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
	
	vm.deleteUserModal=deleteUserModal;   
	function deleteUserModal(){ 
		ineuronApp.confirm("确认","确定删除吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				 $http({
					url : '/user/delete',
					method : 'POST',
					data : {
						username : $scope.updateUsername
					}
				}).success(function(data) {
					validateApiToken(data, $cookies, $rootScope, $modal);
					$state.go("userManagement");
				}).error(function(data) {
					alert('error in delete');
					console.log("error");
				})
			}
		});		
		
	}

}]); // end of controller

ineuronApp.controller('UserListController', ['$http', '$scope', '$location', '$cookies', '$state', '$rootScope', '$modal', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $location, $cookies, $state, $rootScope, $modal, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	
	$http({
		url : '/user/list',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.users = data.value;
		/*var usernameList=new Array();
		for (var i in vm.users){
			usernameList[i]=vm.users[i].username;
		}
		$cookies.put('INeuron-UserNameList', usernameList, {path : "/"});*/
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
		// alert(vm.users[index]);
		$state.go("updateUser", {userStr: JSON.stringify(vm.users[index])});
	}
	
	vm.createUser = createUser;
	function createUser() {
		$state.go("createUser");
	}
}]);


ineuronApp.controller('UserCreateController', ['$scope', '$rootScope', '$modal', '$stateParams', '$http', '$state', '$cookies',
	function($scope, $rootScope, $modal, $stateParams, $http, $state, $cookies) {

	var vm = this;
	
	$scope.usernameCheck=function(){
		//alert("checkusername");
		$http({
			url : '/user/user?username='+$scope.createUsername,
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
		if($scope.createUserPassword!=$scope.createUserPassword2) $scope.inconsistentPwd=true;
		else $scope.inconsistentPwd=false;
	}
	
	vm.createUser = createUser;
	function createUser() {	
		
		$http({
			url : '/user/register',
			method : 'POST',
			data : {
				username : $scope.createUsername,
				firstname : $scope.createUserFirstname,
				lastname : $scope.createUserLastname,
				password : $scope.createUserPassword				
			}
		}).success(function(data) {
			ineuronApp.confirm("提示","新用户已添加！", 'sm', $rootScope, $modal);		
			$state.go("userManagement");
			console.log("success in User Create!");

		}).error(function(data) {
			console.log("error");
		})
	}
		
}]);


ineuronApp.controller('RoleListController', ['$http', '$scope', '$location', '$cookies', '$state', '$rootScope', '$modal', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $location, $cookies, $state, $rootScope, $modal, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	$http({
		url : '/user/rolelist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
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

	vm.createRole = createRole;
	vm.updateRole = updateRole;

	function createRole() {
		$state.go("createRole");
	}
	
	function updateRole(index) {
		$state.go("updateRole", {roleStr: JSON.stringify(vm.roles[index])});
	}
	
	$scope.hasPermission = function(funcId){
		if(hasPermission(funcId)){
			return false;
		}else{
			return true;
		}
	}
}]);

ineuronApp.controller('RoleUpdateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
	function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	var roleStr = $stateParams.roleStr;
	var selectedRole = eval('(' + roleStr + ')');
		
	$scope.updateRolename = selectedRole.rolename;
	$scope.updateRoleDescription = selectedRole.description;

	var vm = this;
	
	vm.funcs = ineuronFuncs.getFuncs();
	
	// set default value to permissions multi-select UI controls
	vm.rolepermissions=selectedRole.permissionList;
	
	for (var upermissions_index in vm.rolepermissions){
		
		var func=vm.rolepermissions[upermissions_index].function;
		var ops=vm.rolepermissions[upermissions_index].operations;
		
		var definedFunc = ineuronFuncs.getFunc(func);
		if(definedFunc != null){
			var definedOps = definedFunc.ops;
			for (var op_index in ops){
				var opid=ops[op_index];
				for (var u_index in definedOps){
					if(opid==definedOps[u_index].id) {
						definedOps[u_index].ticked=true; 
						break;
					}
				}
			}
		}
		
	}
		
	vm.updateRole = updateRole;
	function updateRole() {
		// get updated permissions
		var strPer="";
		for(var i in vm.funcs) {
			var func = vm.funcs[i];
			if(func.output.length > 0){
				var strOps = "";
				for(var j in func.output){
					var ops = func.output[j];
					strOps = strOps.concat(ops.id, "|");
				}
				strPer = strPer.concat(func.id, ":", strOps, ",");
			}			
					
		}
					

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
			validateApiToken(data, $cookies, $rootScope, $modal);
			$state.go("roleManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
		
	vm.deleteRole=deleteRole;
	function deleteRole() {
		ineuronApp.confirm("确认","确定删除吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				$http({
					url : '/user/deleterole',
					method : 'POST',
					data : {
						id : selectedRole.id
					}
				}).success(function(data) {
					validateApiToken(data, $cookies, $rootScope, $modal);
					$state.go("roleManagement");
				}).error(function(data) {
					alert('error in delete');
					console.log("error");
				})
			}
		});				
	}

}]);


ineuronApp.controller('RoleCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal', 
	function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {

	var vm = this;
	
	vm.funcs = ineuronFuncs.getFuncs();	
	vm.createRole = createRole;
	function createRole() {
		// get updated permissions
		var strPer="";
		for(var i in vm.funcs) {
			var func = vm.funcs[i];
			if(func.output.length > 0){
				var strOps = "";
				for(var j in func.output){
					var ops = func.output[j];
					strOps = strOps.concat(ops.id, "|");
				}
				strPer = strPer.concat(func.id, ":", strOps, ",");
			}			
				
		}
				
		$http({
			url : '/user/createrole',
			method : 'POST',
			data : {
				rolename : $scope.updateRolename,
				description : $scope.updateRoleDescription,
				permissions: strPer
			}
		}).success(function(data) {
			validateApiToken(data, $cookies, $rootScope, $modal);
			$state.go("roleManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
		
}]);

