
ineuronApp.controller('ProductCategoryCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
	function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	
	$scope.existedProductCategoryCode=false;
	$scope.existedProductCategoryName=false;
	var companyCode="HS";
	
	var vm = this;
    
	//get attribute list
	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 1
	}).success(function(data) {
		vm.attributeUsages=data.value;
	}).error(function(data) {
		//alert('error');
		console.log("error in get attribute list");
  	});
		
	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 2
	}).success(function(data) {
		vm.attributeEmulsionTypes=data.value;
	}).error(function(data) {
		//alert('error');
		console.log("error in get attribute list");
  	});

	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 3
	}).success(function(data) {
		vm.attributeColors=data.value;
	}).error(function(data) {
		//alert('error');
		console.log("error in get attribute list");
  	});

	$scope.CheckProductCategoryName=function(){
		//alert("checkproductcategeryname");
		//$scope.existedProductCategoryName=VerifyExistedProductCategoryName($scope.productCategoryName, $http);
		$http({
			url : '/product/getproductcategorybyname',
			method : 'POST',
			data :  $scope.productCategoryName
		}).success(function(data) {
			var pc = data.value;
			if(pc==null) $scope.existedProductCategoryName=false; 
			 else $scope.existedProductCategoryName=true;
		}).error(function(data) {
			//alert('error');
			console.log("error to get productcategory ");
		});				
	}
	
	$scope.CheckProductCategoryCode=function(){
		$scope.productCategoryCode=companyCode+"-"+$scope.selectedAttributeUsage[0].code+"-"+$scope.selectedEmulsionType[0].code+"-"+$scope.selectedColor[0].code;
		$http({
			url : '/product/getproductcategorybycode',
			method : 'POST',
			data :  $scope.productCategoryCode
		}).success(function(data) {
			var pc = data.value;
			if(pc==null) $scope.existedProductCategoryCode=false; 
			 else $scope.existedProductCategoryCode=true;
		}).error(function(data) {
			//alert('error');
			console.log("error to get productcategory ");
		});			
	}
	
	vm.createProductCategory = createProductCategory;
	function createProductCategory() {
	   //alert("to createProductCategory");
		$scope.productCategoryCode=companyCode+"-"+$scope.selectedAttributeUsage[0].code+"-"+$scope.selectedEmulsionType[0].code+"-"+$scope.selectedColor[0].code;
		
		$http({
			url : '/product/createproductcategory',
			method : 'POST',
			data : {
				name : $scope.productCategoryName,
				code: $scope.productCategoryCode,
				description : $scope.productCategoryDescription,
				characters: $scope.productCategoryCharacters,
				techParameters: $scope.productCategoryTechParameters,
				scope: $scope.productCategoryScope			
			}
		}).success(function(data) {
			validateApiToken(data, $cookies);
			ineuronApp.confirm("提示","产品类型添加成功！", 'sm', $rootScope, $modal);		
			$state.go("productCategoryList");
		}).error(function(data) {
			alert('error');
			console.log("error");
	  		})
	  	}
	  		
}]);


ineuronApp.controller('ProductCategoryListController', ['$http', '$scope', '$rootScope', '$modal', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $rootScope, $modal, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	
	$http({
		url : '/product/productcategorylist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.productCategories = data.value;
	}).error(function(data) {
		alert('error');
		console.log("error");
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
	                    DTColumnDefBuilder.newColumnDef(1),
	                    DTColumnDefBuilder.newColumnDef(2).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(3).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(4).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(5).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(6).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(7).notSortable() ];
	
	vm.updateProductCategory=updateProductCategory;
	function updateProductCategory(index){
		//alert(index+vm.productCategories[index].code);
		$state.go("updateProductCategory", {productCategoryStr: JSON.stringify(vm.productCategories[index])});
	}
	
	vm.productList=productList;
	function productList(index){
		//var pcId=vm.productCategories[index].id;
		$state.go("productList", {productCategoryStr: JSON.stringify(vm.productCategories[index])});
	}
	
	vm.createProductCategory=createProductCategory;
	function createProductCategory(){
		//alert("index: "+index);
		$state.go("createProductCategory");
	}
	
	vm.createProduct=createProduct;
	function createProduct(){
		//alert("index: "+index);
		$state.go("createProduct");
	}
	
}]);

ineuronApp.controller('ProductCategoryUpdateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
    function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	
	var productCategory = eval('(' + $stateParams.productCategoryStr + ')');
	$scope.productCategoryName=productCategory.name;
	var codeList=productCategory.code.split("-");
	$scope.existedProductCategoryCode=false;
	$scope.existedProductCategoryName=false;
	var companyCode="HS";
	
	var vm = this;

	//get attribute list
	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 1
	}).success(function(data) {
		vm.attributeUsages=data.value;
		for (var i in vm.attributeUsages){
			if(vm.attributeUsages[i].code==codeList[1]) vm.attributeUsages[i].ticked=true;
		}
	}).error(function(data) {
		//alert('error');
		console.log("error in get attribute list");
	});

	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 2
	}).success(function(data) {
		vm.attributeEmulsionTypes=data.value;
		for (var i in vm.attributeEmulsionTypes){
			if(vm.attributeEmulsionTypes[i].code==codeList[2]) vm.attributeEmulsionTypes[i].ticked=true;
		}
	}).error(function(data) {
		//alert('error');
		console.log("error in get attribute list");
	});

	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 3
	}).success(function(data) {
		vm.attributeColors=data.value;
		for (var i in vm.attributeColors){
			if(vm.attributeColors[i].code==codeList[3]) vm.attributeColors[i].ticked=true;
		}
	}).error(function(data) {
		//alert('error');
		console.log("error in get attribute list");
	});

	$scope.CheckProductCategoryName=function(){
		//alert("checkproductcategeryname");
		//$scope.existedProductCategoryName=VerifyExistedProductCategoryName($scope.productCategoryName, $http);
		$http({
			url : '/product/getproductcategorybyname',
			method : 'POST',
			data :  $scope.productCategoryName
		}).success(function(data) {
			var pc = data.value;
			if(pc==null) $scope.existedProductCategoryName=false; 
			 else $scope.existedProductCategoryName=true;
		}).error(function(data) {
			//alert('error');
			console.log("error to get productcategory ");
		});				
	}
	
	$scope.CheckProductCategoryCode=function(){
		$scope.productCategoryCode=companyCode+"-"+$scope.selectedAttributeUsage[0].code+"-"+$scope.selectedEmulsionType[0].code+"-"+$scope.selectedColor[0].code;
		$http({
			url : '/product/getproductcategorybycode',
			method : 'POST',
			data :  $scope.productCategoryCode
		}).success(function(data) {
			var pc = data.value;
			if(pc==null) $scope.existedProductCategoryCode=false; 
			 else $scope.existedProductCategoryCode=true;
		}).error(function(data) {
			//alert('error');
			console.log("error to get productcategory ");
		});			
	}
	
	vm.updateProductCategory = updateProductCategory;
	function updateProductCategory() {
		ineuronApp.confirm("确认","确定修改吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				var companyCode="HS";
				var codeStr=companyCode+"-"+$scope.selectedAttributeUsage[0].code+"-"+$scope.selectedEmulsionType[0].code+"-"+$scope.selectedColor[0].code;
				//alert($scope.selectedAttributeUsage);
				$http({
					url : '/product/updateproductcategory',
					method : 'POST',
					data : {
						id : selectedProductCategory.id,
						name : $scope.productCategoryName,
						code: codeStr,
						description : $scope.productCategoryDescription,
						characters: $scope.productCategoryCharacters,
						techParameters: $scope.productCategoryTechParameters,
						scope: $scope.productCategoryScope			
					}
				}).success(function(data) {
					validateApiToken(data, $cookies);
					ineuronApp.confirm("提示","修改类型成功！", 'sm', $rootScope, $modal);		
					$state.go("productCategoryList");
				}).error(function(data) {
					alert('error');
					console.log("error");
				})
			}
		});				
	}

}]);


ineuronApp.controller('ProductCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
    function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	
	var vm = this;
	
	$scope.CheckProductName=function(){
		//alert("checkproductcategeryname");
		//$scope.existedProductCategoryName=VerifyExistedProductCategoryName($scope.productCategoryName, $http);
		$http({
			url : '/product/productbyname',
			method : 'POST',
			data :  $scope.productName
		}).success(function(data) {
			var pc = data.value;
			if(pc==null) $scope.existedProductName=false; 
			 else $scope.existedProductName=true;
		}).error(function(data) {
			//alert('error');
			console.log("error to get product ");
		});				
	}
	
	//get productcategory list
	$http({
		url : '/product/productcategorylist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.productCategories = data.value;
		//alert(vm.productCategories[0].name);
	}).error(function(data) {
		ineuronApp.confirm("提示","调用失败！", 'sm', $rootScope, $modal);
		console.log("error");
	});
	
	//get formula list
	$http({
		url : '/product/formulas',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies);
		vm.productFormulas = data.value;
		//alert(vm.productFormulas[0].name);
	}).error(function(data) {
		ineuronApp.confirm("提示","调用失败！", 'sm', $rootScope, $modal);
		console.log("error");
	});
	
	
	vm.createProduct = createProduct;
	function createProduct() {
	   alert("pc id: "+$scope.selectedProductCategory[0].id+$scope.selectedProductCategory[0].code+$scope.selectedProductFormula.id);
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
			validateApiToken(data, $cookies);
			ineuronApp.confirm("提示","产品添加成功！", 'sm', $rootScope, $modal);		
			$state.go("productList");
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
		validateApiToken(data, $cookies);
		vm.products = data.value;
		//alert(vm.products[0].name);
	}).error(function(data) {
		//alert('error');
		console.log("error");
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
	'full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
	                    DTColumnDefBuilder.newColumnDef(1),
	                    DTColumnDefBuilder.newColumnDef(2).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(3).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(4).notSortable()];

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

	vm.productCreate=productCreate;
	function productCreate(){
		//alert("create pro");
		$state.go("createProduct");
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
			var isValid = validateFormula(formula);
			if(!isValid){
				return;
			}
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
		
		function validateFormula(formula){
			var totalQuantity = 0.0;
			for(var index in formula.materials){
				var materialQuantity = formula.materials[index].materialQuantity;
				var materialId = formula.materials[index].materialId;
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
				validateApiToken(data, $cookies);
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