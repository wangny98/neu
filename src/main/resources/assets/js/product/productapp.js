

ineuronApp.controller('ProductCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies',
	function($scope, $stateParams, $http, $state, $cookies) {

	var vm = this;
	
	vm.createProduct = createProduct;
	function createProduct() {
	   alert("to createProduct");
		$http({
			url : '/product/createproduct',
			method : 'POST',
			data : {
				productname : $scope.productName,
				productcode: $scope.productCode,
				description : $scope.productDescription
			}
		}).success(function(data) {
			validateApiToken(data, $cookies);
			$state.go("productManagement");
		}).error(function(data) {
			alert('error');
			console.log("error");
		})
	}
		
}]);
