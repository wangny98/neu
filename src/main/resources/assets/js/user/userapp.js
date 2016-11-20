

ineuronApp.controller('UserUpdateController', function($scope, $stateParams,
		$http, $state, $cookies,$rootScope,$modal) {
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
		
		var funcStr=vm.userpermissions[upermissions_index].function;
		var func=funcStr.split("|");
		var ops=vm.userpermissions[upermissions_index].operations;
		
		var definedFunc = ineuronFuncs.getFunc(func[0]);
		if(definedFunc != null){
			var definedOps = definedFunc.ops;
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in definedOps){
					if(opid[0]==definedOps[u_index].id) {definedOps[u_index].ticked=true; break;}	
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
		validateApiToken(data, $cookies);
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
			validateApiToken(data, $cookies);
			$state.go("userManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
	
	// //
	var scope = $rootScope.$new();
	scope.data = {
			title:"提示",
			content:"确定要删除吗？"
	   }
	vm.clickok=false;   
	vm.deleteUserModal=deleteUserModal;   
	function deleteUserModal(size){ 
		var modalInstance = $modal.open({
			templateUrl : 'modaltemplate.html',  
			controller : 'ModalInstanceCtrl',
			size : size, // default:middle; sm, lg
			scope:scope,
			resolve : {
				body : function(){
					return $scope.clickok;
				}
			}
		})
		modalInstance.result.then(function(clickok){  
			$scope.clickok = clickok;
			// alert($scope.clickok);
			if($scope.clickok){
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
	}

}); // end of controller

ineuronApp.controller('UserListController', function($http, $scope, $location,
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
		// alert(vm.users[index]);
		$state.go("updateUser", {userStr: JSON.stringify(vm.users[index])});
	}
});

ineuronApp.controller('RoleListController', function($http, $scope, $location,
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

	vm.createRole = createRole;
	vm.updateRole = updateRole;

	function createRole() {
		$state.go("createRole");
	}
	
	function updateRole(index) {
		$state.go("updateRole", {roleStr: JSON.stringify(vm.roles[index])});
	}
});

ineuronApp.controller('RoleUpdateController', function($scope, $stateParams,
		$http, $state, $cookies) {
	var roleStr = $stateParams.roleStr;
	var selectedRole = eval('(' + roleStr + ')');
		
	$scope.updateRolename = selectedRole.rolename;
	$scope.updateRoleDescription = selectedRole.description;

	var vm = this;
	
	vm.funcs = ineuronFuncs.getFuncs();
	
	// set default value to permissions multi-select UI controls
	vm.rolepermissions=selectedRole.permissionList;
	
	for (var upermissions_index in vm.rolepermissions){
		
		var funcStr=vm.rolepermissions[upermissions_index].function;
		var func=funcStr.split("|");
		var ops=vm.rolepermissions[upermissions_index].operations;
		
		var definedFunc = ineuronFuncs.getFunc(func[0]);
		if(definedFunc != null){
			var definedOps = definedFunc.ops;
			for (var op_index in ops){
				var opid=ops[op_index].split("|");
				for (var u_index in definedOps){
					if(opid[0]==definedOps[u_index].id) {definedOps[u_index].ticked=true; break;}	
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
			validateApiToken(data, $cookies);
			$state.go("roleManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
		
	vm.deleteRole=deleteRole;
	function deleteRole() {
		// alert(vm.roles[index]);
		$http({
			url : '/user/deleterole',
			method : 'POST',
			data : {
				id : selectedRole.id
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


ineuronApp.controller('ModalInstanceCtrl',function($scope,$modalInstance,body){
		$scope.title = $scope.data.title;
	    $scope.content=$scope.data.content;
	
		$scope.ok = function(){  
			$scope.clickok=true;
			$modalInstance.close($scope.clickok); 
		};
		$scope.cancel = function(){
			$scope.clickok=false;
			$modalInstance.close($scope.clickok); 
		}
	});


ineuronApp.controller('RoleCreateController', function($scope, $stateParams,
		$http, $state, $cookies) {

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
			validateApiToken(data, $cookies);
			$state.go("roleManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
		
});

