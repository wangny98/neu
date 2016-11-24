

ineuronApp.controller('ProductCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies',
	function($scope, $stateParams, $http, $state, $cookies) {

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
			//validateApiToken(data, $cookies);
			$state.go("productManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
		
}]);


ineuronApp.controller('ProductListController', ['$http', '$scope', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
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
	function updateProduct(index) {
		// alert(vm.users[index]);
		$state.go("updateProduct", {productStr: JSON.stringify(vm.products[index])});
	}
}]);


