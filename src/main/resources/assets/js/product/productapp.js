
ineuronApp.controller('ProductCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
	function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {

	var vm = this;
	
	vm.createProduct = createProduct;
	function createProduct() {
	   //alert("to createProduct");
		$http({
			url : '/product/create',
			method : 'POST',
			data : {
				productname : $scope.productName,
				productcode: $scope.productCode,
				description : $scope.productDescription
			}
		}).success(function(data) {
			validateApiToken(data, $cookies);
			ineuronApp.confirm("提示","产品添加成功！", 'sm', $rootScope, $modal).result.then(function(clickok){  
				if(clickok){
				}
			});		
			$state.go("productList");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
		
}]);


ineuronApp.controller('ProductListController', ['$http', '$scope', '$rootScope', '$modal', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $rootScope, $modal, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	
	$http({
		url : '/product/list',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.products = data.value;
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
	
	vm.updateProduct=updateProduct;
	function updateProduct($index){
		ineuronApp.confirm("确认","确定修改吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				 /*$http({
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
				})*/
			}
		});		
	}
	
	vm.productAttributes=productAttributes;
	function productAttributes(index){
		//alert("index: "+index);
		$state.go("productAttributes", {productStr: JSON.stringify(vm.products[index])});
	}
	
	
	vm.updateManufacturingProcess=updateManufacturingProcess;
	function updateManufacturingProcess(index) {
		// alert(vm.users[index]);
		$state.go("productManufacturingProcess", {productStr: JSON.stringify(vm.products[index])});
	}
}]);

ineuronApp.controller('ProductAttributesController', ['$http', '$scope', '$stateParams', '$rootScope', '$modal', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $stateParams, $rootScope, $modal, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	var selectedProductStr = $stateParams.productStr;
	var selectedProduct = eval('(' + selectedProductStr + ')');	
	
	//alert(selectedProduct);
	vm.product=selectedProduct;
	//alert("productid: "+vm.product.id);
	$http({
		url : '/product/attributelist',
		method : 'POST',
		data : vm.product.id
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.attributes = data.value;
	}).error(function(data) {
		alert('error');
		console.log("error");
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1).notSortable() ];
	
	vm.updateAttribute=updateAttribute;
	function updateAttribute($index){
		ineuronApp.confirm("确认","确定修改吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				 /*$http({
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
				})*/
			}
		});		
	}
	
	vm.addAttribute=addAttribute;
	function addAttribute($index){
		//alert("id: "+vm.product.id+" attribute: "+vm.newAttribute);
		ineuronApp.confirm("确认","确定添加吗？", 'sm', $rootScope, $modal).result.then(function(clickok){
			
			if(clickok){
				 $http({
					url : '/product/createattribute',
					method : 'POST',
					data : {
						productid : vm.product.id,
						attribute: vm.newAttribute
					}
				}).success(function(data) {
					validateApiToken(data, $cookies);
					$state.go("productAttributes");
				}).error(function(data) {
					//alert('error in add ');
					console.log("error in add attribute");
				})
			}
		});		
	}
	
	vm.deleteAttribute=deleteAttribute;
	function deleteAttribute($index){
		ineuronApp.confirm("确认","确定删除吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				 /*$http({
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
				})*/
			}
		});		
	}
}]);


ineuronApp.controller('ProductListController', [
		'$http',
		'$scope',
		'$location',
		'$cookies',
		'$state',
		'DTOptionsBuilder',
		'DTColumnDefBuilder',
		function($http, $scope, $location, $cookies, $state, DTOptionsBuilder,
				DTColumnDefBuilder) {
			var vm = this;

			$http({
				url : '/product/list',
				method : 'GET'
			}).success(function(data) {
				validateApiToken(data, $cookies);
				vm.products = data.value;
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

			vm.updateManufacturingProcess = updateManufacturingProcess;
			function updateManufacturingProcess(index) {
				//alert(JSON.stringify(vm.products[index]));
				$state.go("productManufacturingProcess", {productStr: JSON.stringify(vm.products[index])});
			}
		} ]);

ineuronApp.controller('ProductManufacturingProcessController', [
		'$http',
		'$stateParams',
		'$scope',
		'$location',
		'$cookies',
		'$state',
		'$rootScope', 
		'$modal',
		'DTOptionsBuilder',
		'DTColumnDefBuilder',
		function($http, $stateParams, $scope, $location, $cookies, $state, $rootScope, $modal,
				DTOptionsBuilder, DTColumnDefBuilder) {
			var vm = this;

			var productStr = $stateParams.productStr;
			var selectedProduct = eval('(' + productStr + ')');
			$scope.productName = selectedProduct.productname;
			var productId = selectedProduct.id;
			$http({
				url : '/product/manufacturing?id=' + productId,
				method : 'GET'
			}).success(function(data) {
				//alert(JSON.stringify(data));
				validateApiToken(data, $cookies);
				$scope.model = {
					rows : data.value,
					selected : {}
				}
			}).error(function(data) {
				alert('error');
				console.log("error");
			});

			$http({
				url : '/product/operations',
				method : 'GET'
			}).success(function(data) {
				//alert(JSON.stringify(data));
				validateApiToken(data, $cookies);
				$scope.operations = data.value;
			}).error(function(data) {
				alert('error');
				console.log("error");
			});

			$http({
				url : '/product/materials',
				method : 'GET'
			}).success(function(data) {
				//alert(JSON.stringify(data));
				validateApiToken(data, $cookies);
				$scope.materials = data.value;
			}).error(function(data) {
				alert('error');
				console.log("error");
			});

			// gets the template to ng-include for a table row / item
			$scope.getTemplate = function(row) {
				if (row === $scope.model.selected)
					return 'edit';
				else
					return 'display';
			};

			$scope.editContact = function(index) {
				$scope.model.selected = $scope.model.rows[index];
			};

			$scope.saveContact = function(index) {
				console.log("Saving contact");
				$scope.model.rows[index] = angular.copy($scope.model.selected);
				$scope.reset();
			};

			$scope.reset = function() {
				$scope.model.selected = {};
			};

			var emptyProcess = {
					"stepId" : 0,
					"productId" : productId,
					"orderId" : 0,
					"operationId" : 0,
					"materialId" : 0,
					"materialQuantity" : 0,
					"equipmentId" : 0
				};
			
			$scope.addRow = addRow;
			$scope.removeRow = removeRow;
			$scope.saveProcesses = saveProcesses;
			
			function addRow() {
				var newProcess = clone(emptyProcess);

				$scope.model.rows.push(newProcess);
				$scope.model.selected = newProcess;
			};

			function removeRow(index) {
				$scope.model.rows.splice(index, 1);
			};
			
			function saveProcesses(){
				//alert(JSON.stringify($scope.model.rows));
				$http({
					url : '/product/saveprocesses',
					method : 'POST',
					data : $scope.model.rows
				}).success(function(data) {
					validateApiToken(data, $cookies);
					if(data.success == true){
						ineuronApp.confirm("提示","保存成功！", 'sm', $rootScope, $modal);
					}
					else{
						ineuronApp.confirm("提示","保存失败！", 'sm', $rootScope, $modal);
					}
				}).error(function(data) {
					ineuronApp.confirm("提示","保存失败！", 'sm', $rootScope, $modal);
					console.log("error");
				})
			}

		} ]);

ineuronApp.controller('FormulaListController', ['$http', '$scope', '$rootScope', '$modal', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $rootScope, $modal, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	
	$http({
		url : '/product/formulas',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.formulas = data.value;
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
	
	vm.updateFormula=updateFormula;
	function updateFormula(index){
		$state.go("formulaEdit", {formulaStr: JSON.stringify(vm.formulas[index])});
	}
	
}]);

ineuronApp.controller('FormulaEditController', [
	'$http',
	'$stateParams',
	'$scope',
	'$location',
	'$cookies',
	'$state',
	'$rootScope', 
	'$modal',
	'DTOptionsBuilder',
	'DTColumnDefBuilder',
	function($http, $stateParams, $scope, $location, $cookies, $state, $rootScope, $modal,
			DTOptionsBuilder, DTColumnDefBuilder) {
		var vm = this;
		$scope.formula = {};
		
		var formulaStr = $stateParams.formulaStr;
		var selectedFormula = eval('(' + formulaStr + ')');
		$scope.formula.id = selectedFormula.id;
		$scope.formula.name = selectedFormula.name;
		$scope.formula.description = selectedFormula.description;
		var formulaId = selectedFormula.id;
		$http({
			url : '/product/formulamaterials?id=' + formulaId,
			method : 'GET'
		}).success(function(data) {
			validateApiToken(data, $cookies);
			$scope.formula.materials = data.value;
			$scope.formula.selected = {};
		}).error(function(data) {
			alert('error');
			console.log("error");
		});

		$http({
			url : '/product/materials',
			method : 'GET'
		}).success(function(data) {
			//alert(JSON.stringify(data));
			validateApiToken(data, $cookies);
			$scope.materials = data.value;
		}).error(function(data) {
			alert('error');
			console.log("error");
		});

		// gets the template to ng-include for a table row / item
		$scope.getTemplate = function(row) {
			if (row === $scope.formula.selected)
				return 'edit';
			else
				return 'display';
		};

		$scope.editContact = function(index) {
			$scope.formula.selected = $scope.formula.materials[index];
		};

		$scope.saveContact = function(index) {
			console.log("Saving contact");
			$scope.formula.materials[index] = angular.copy($scope.formula.selected);
			$scope.reset();
		};

		$scope.reset = function() {
			$scope.formula.selected = {};
		};

		var emptyFormulaMaterial = {
				"id" : 0,
				"formulaId" : formulaId,
				"materialId" : 0,
				"materialQuantity" : 0
			};
		
		$scope.addRow = addRow;
		$scope.removeRow = removeRow;
		$scope.updateFormula = updateFormula;
		
		function addRow() {
			var newMaterial = clone(emptyFormulaMaterial);

			$scope.formula.materials.push(newMaterial);
			$scope.formula.selected = newMaterial;
		};

		function removeRow(index) {
			$scope.formula.materials.splice(index, 1);
		};
		
		function updateFormula(){
			var formula = getFormula();
			$http({
				url : '/product/updateformula',
				method : 'POST',
				data : formula
			}).success(function(data) {
				validateApiToken(data, $cookies);
				if(data.success == true){
					ineuronApp.confirm("提示","保存成功！", 'sm', $rootScope, $modal);
				}
				else{
					ineuronApp.confirm("提示","保存失败！", 'sm', $rootScope, $modal);
				}
			}).error(function(data) {
				ineuronApp.confirm("提示","保存失败！", 'sm', $rootScope, $modal);
				console.log("error");
			})
		}
		
		function getFormula(){
			var formula = {};
			formula.id = $scope.formula.id;
			formula.name = $scope.formula.name;
			formula.description = $scope.formula.description;
			formula.materials = [];
			for(var index in  $scope.formula.materials){
				var newMaterial = {};
				newMaterial.formulaId = $scope.formula.materials[index].formulaId;
				newMaterial.materialId = $scope.formula.materials[index].materialId;
				newMaterial.materialQuantity = $scope.formula.materials[index].materialQuantity;
				formula.materials.push(newMaterial);
			}
			
			return formula;
			
		}

	} ]);

