
ineuronApp.controller('ProductCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
    function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	
	var vm = this;
	
	$scope.existedProductName=false;
	$scope.CheckProductName=function(){
		// alert("checkproductcategeryname");
		// $scope.existedProductCategoryName=VerifyExistedProductCategoryName($scope.productCategoryName,
		// $http);
		$http({
			url : '/product/productbyname',
			method : 'POST',
			data :  $scope.productName
		}).success(function(data) {
			var pc = data.value;
			if(pc==null) $scope.existedProductName=false; 
			 else $scope.existedProductName=true;
		}).error(function(data) {
			// alert('error');
			console.log("error to get product ");
		});				
	}
	
	// get productcategory list
	$http({
		url : '/product/productcategorylist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.productCategories = data.value;
		// alert(vm.productCategories[0].name);
	}).error(function(data) {
		ineuronApp.confirm("提示","调用失败！", 'sm', $rootScope, $modal);
		console.log("error");
	});
	
	// get formula list
	$http({
		url : '/product/formulas',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.productFormulas = data.value;
		// alert(vm.productFormulas[0].name);
	}).error(function(data) {
		ineuronApp.confirm("提示","调用失败！", 'sm', $rootScope, $modal);
		console.log("error");
	});
	
	
	vm.createProduct = createProduct;
	function createProduct() {
	   // alert("pc id:
		// "+$scope.selectedProductCategory[0].id+$scope.selectedProductCategory[0].code+$scope.selectedProductFormula.id);
		$http({
			url : '/product/createproduct',
			method : 'POST',
			data : {
				name : $scope.productName,
				productCategoryId: $scope.selectedProductCategory[0].id,
				code: $scope.selectedProductCategory[0].code,
				formulaId: $scope.selectedProductFormula[0].id,
				description : $scope.productDescription
			}
		}).success(function(data) {
			validateApiToken(data, $cookies, $rootScope, $modal);
			ineuronApp.confirm("提示","产品添加成功！", 'sm', $rootScope, $modal);		
			$state.go("productList", {productCategoryStr: JSON.stringify($scope.selectedProductCategory[0])});
		}).error(function(data) {
			ineuronApp.confirm("提示","产品添加失败！", 'sm', $rootScope, $modal);
			console.log("error");
		})
	}
		
}]);


ineuronApp.controller('ProductListController', ['$http', '$scope', '$stateParams', '$rootScope', '$modal', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
   function($http, $scope, $stateParams, $rootScope, $modal, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	var productCategory = eval('(' + $stateParams.productCategoryStr + ')');

	$scope.productCategoryName=productCategory.name;

	$http({
		url : '/product/productlistbycategory',
		method : 'POST',
		data : productCategory.id
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.products = data.value;
	}).error(function(data) {
		// alert('error');
		console.log("error");
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
	                    DTColumnDefBuilder.newColumnDef(1),
	                    DTColumnDefBuilder.newColumnDef(2).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(3).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(4).notSortable()];

	vm.updateProduct=updateProduct;
	function updateProduct($index){
		ineuronApp.confirm("确认","确定修改吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
					/*
					 * $http({ url : '/user/delete', method : 'POST', data : {
					 * username : $scope.updateUsername }
					 * }).success(function(data) { validateApiToken(data,
					 * $cookies); $state.go("userManagement");
					 * }).error(function(data) { alert('error in delete');
					 * console.log("error"); })
					 */
			}
		});		
	}

	vm.productCreate=productCreate;
	function productCreate(){
		// alert("create pro");
		$state.go("createProduct");
	}


	vm.updateManufacturingProcess=updateManufacturingProcess;
	function updateManufacturingProcess(index) {
		$state.go("productManufacturingProcess", {productStr: JSON.stringify(vm.products[index])});
	}
}]);


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
			$scope.productName = selectedProduct.name;
			var productId = selectedProduct.id;
			$http({
				url : '/product/productbyid?id=' + productId,
				method : 'GET'
			}).success(function(data) {
				//alert(JSON.stringify(data));
				validateApiToken(data, $cookies, $rootScope, $modal);
				var manufacturingProcesses = data.value.manufacturingProcesses
				if(manufacturingProcesses == undefined){
					manufacturingProcesses = {};
				}
				$scope.model = {
						rows : manufacturingProcesses,	
						selected : {}
					}
				$scope.operations = data.value.operations;
				if(data.value.formula == undefined || data.value.formula.materials == undefined){
					ineuronApp.confirm("提示","请为产品选择配方，然后设置工艺流程！", 'sm', $rootScope, $modal);
				}else{
					$scope.materials = data.value.formula.materials;
				}
				
			}).error(function(data) {
				alert(JSON.stringify(data));
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
				// alert(JSON.stringify($scope.model.rows));
				$http({
					url : '/product/saveprocesses',
					method : 'POST',
					data : $scope.model.rows
				}).success(function(data) {
					validateApiToken(data, $cookies, $rootScope, $modal);
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
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.formulas = data.value;
	}).error(function(data) {
		alert('error');
		console.log("error");
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2).notSortable() ];
	
	vm.updateFormula=updateFormula;
	vm.createFormula=createFormula;
	vm.deleteFormula=deleteFormula;
	function updateFormula(index){
		$state.go("updateFormula", {formulaStr: JSON.stringify(vm.formulas[index])});
	}
	function createFormula(){
		$state.go("createFormula");
	}
	function deleteFormula(index){
		ineuronApp.confirm("确认","确定删除吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				$http({
					url : '/product/deleteformula?id=' + vm.formulas[index].id,
					method : 'POST'
				}).success(function(data) {
					ineuronApp.confirm("提示","删除成功！", 'sm', $rootScope, $modal);
					$state.go("formulaList", null, {reload:true});
				}).error(function(data) {
					alert('error');
					console.log("error");
				});
			}
		})
	}
}]);

ineuronApp.controller('UpdateFormulaController', [
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
			url : '/product/formulabyid?id=' + formulaId,
			method : 'GET'
		}).success(function(data) {
			//alert(JSON.stringify(data));
			validateApiToken(data, $cookies, $rootScope, $modal);
			$scope.formula.materials = data.value.materialSettings;
			$scope.formula.selected = {};
		}).error(function(data) {
			alert('error');
			console.log("error");
		});

		$http({
			url : '/product/materials',
			method : 'GET'
		}).success(function(data) {
			// alert(JSON.stringify(data));
			validateApiToken(data, $cookies, $rootScope, $modal);
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
			var isValid = validateFormula(formula);
			if(!isValid){
				return;
			}
			$http({
				url : '/product/updateformula',
				method : 'POST',
				data : formula
			}).success(function(data) {
				validateApiToken(data, $cookies, $rootScope, $modal);
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
			formula.materialSettings = [];
			for(var index in  $scope.formula.materials){
				var newMaterial = {};
				newMaterial.formulaId = $scope.formula.materials[index].formulaId;
				newMaterial.materialId = $scope.formula.materials[index].materialId;
				newMaterial.materialQuantity = $scope.formula.materials[index].materialQuantity;
				formula.materialSettings.push(newMaterial);
			}
			
			return formula;
			
		}
		
		function validateFormula(formula){
			var totalQuantity = 0.0;
			for(var index in formula.materialSettings){
				var materialQuantity = formula.materialSettings[index].materialQuantity;
				var materialId = formula.materialSettings[index].materialId;
				if(isNaN(materialQuantity)){
					ineuronApp.confirm("提示","物料的比例应为数字。", 'sm', $rootScope, $modal);
					return false;
				}
				if(materialId == 0){
					ineuronApp.confirm("提示","物料不能为空。", 'sm', $rootScope, $modal);
					return false;
				}
				totalQuantity += parseFloat(materialQuantity);
				
			}
			if(totalQuantity == 100){
				return true;
			}else{
				ineuronApp.confirm("提示","所有配方的比例之和不是 100，请修改比例之后重新保存。", 'sm', $rootScope, $modal);
				return false;
			}
		}

	} ]);

ineuronApp.controller('CreateFormulaController', [
	'$http',
	'$stateParams',
	'$scope',
	'$location',
	'$cookies',
	'$state',
	'$rootScope', 
	'$modal',
	function($http, $stateParams, $scope, $location, $cookies, $state, $rootScope, $modal) {
		var vm = this;
		$scope.formula = {};
	
		$scope.createFormula = createFormula;
		
		function createFormula(){
			if($scope.formula.name == null){
				ineuronApp.confirm("提示","请输入配方名称", 'sm', $rootScope, $modal);
				return;
			}
			$http({
				url : '/product/createformula',
				method : 'POST',
				data : $scope.formula
			}).success(function(data) {
				validateApiToken(data, $cookies, $rootScope, $modal);
				if(data.success == true){
					ineuronApp.confirm("提示","保存成功！", 'sm', $rootScope, $modal);
					$state.go("formulaList");
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