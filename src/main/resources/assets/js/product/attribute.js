
ineuronApp.controller('ProductAttributesController', ['$http', '$scope', '$stateParams', '$rootScope', '$modal', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $stateParams, $rootScope, $modal, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	var selectedProductStr = $stateParams.productStr;
	var selectedProduct = eval('(' + selectedProductStr + ')');	
	
	// alert(selectedProduct);
	vm.product=selectedProduct;
	// alert("productid: "+vm.product.id);
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
	
	vm.addAttribute=addAttribute;
	function addAttribute($index){
		// alert("id: "+vm.product.id+" attribute: "+vm.newAttribute);
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
					// alert('error in add ');
					console.log("error in add attribute");
				})
			}
		});		
	}
	
	vm.deleteAttribute=deleteAttribute;
	function deleteAttribute($index){
		ineuronApp.confirm("确认","确定删除吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
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
}]);


