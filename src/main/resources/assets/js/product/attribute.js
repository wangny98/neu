
ineuronApp.controller('AttributeListController', ['$http', '$scope', '$stateParams', '$rootScope', '$modal', '$location', '$cookies', '$state', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($http, $scope, $stateParams, $rootScope, $modal, $location, $cookies, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	var vm = this;
	//var selectedProductStr = $stateParams.productStr;
	//var selectedProduct = eval('(' + selectedProductStr + ')');	
	
	$http({
		url : '/product/attributelist',
		method : 'GET'
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.attributes = data.value;
		//alert(vm.attributes[0].name+" "+vm.attributes[0].attributeCategory.name);
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
	
	vm.createAttribute=createAttribute;
	function createAttribute(){
		// alert("index: "+index);
		$state.go("createAttribute");
	}
		
}]);


ineuronApp.controller('AttributeCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
   function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {

	var vm = this;
	$scope.existedAttributeName=false;
		$http({
			url : '/product/attributecategorylist',
			method : 'GET'
		}).success(function(data) {
			vm.attributeCategories = data.value;
		}).error(function(data) {
			ineuronApp.confirm("提示","调用属性类型列表失败！", 'sm', $rootScope, $modal);
			console.log("error to get attribute category list ");
		});				

$scope.CheckAttributeName=function(){
	// alert("checkproductcategeryname");
	// $scope.existedProductCategoryName=VerifyExistedProductCategoryName($scope.productCategoryName,
	// $http);
	$http({
		url : '/product/getattributebyname',
		method : 'POST',
		data :  $scope.attributeName
	}).success(function(data) {
		var a = data.value;
		if(a==null) $scope.existedProductCategoryName=false; 
		 else $scope.existedProductCategoryName=true;
	}).error(function(data) {
		ineuronApp.confirm("提示","依据名称调用属性失败！", 'sm', $rootScope, $modal);
		console.log("error to get attribute ");
	});				
}


vm.createAttribute = createAttribute;
function createAttribute() {
	
	$http({
		url : '/product/createattribute',
		method : 'POST',
		data : {
			name : $scope.attributeName,
			code: $scope.attributeCode,
			description : $scope.attributeDescription,
			attributeCategoryId: $scope.selectedAttributeCategory[0].id
		}
	}).success(function(data) {
		validateApiToken(data, $cookies, $rootScope, $modal);
		ineuronApp.confirm("提示","属性添加成功！", 'sm', $rootScope, $modal);		
		$state.go("attributeList");
	}).error(function(data) {
		ineuronApp.confirm("提示","添加属性失败！", 'sm', $rootScope, $modal);
		console.log("error");
  		})
  	}

}]);


