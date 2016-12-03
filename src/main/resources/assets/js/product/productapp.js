

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


ineuronApp.controller('ProductManufacturingProcessController', ['$http', '$scope', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	
	$http({
		url : '/product/manufacturingprocess',
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
	
	vm.updateManufacturingProcess=updateManufacturingProcess;
	function updateManufacturingProcess(index) {
		// alert(vm.users[index]);
		$state.go("product", {productStr: JSON.stringify(vm.products[index])});
	}
}]);



