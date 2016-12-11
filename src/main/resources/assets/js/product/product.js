
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
