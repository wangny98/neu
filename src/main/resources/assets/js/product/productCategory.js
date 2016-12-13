
ineuronApp.controller('ProductCategoryCreateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
	function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	
	$scope.existedProductCategoryCode=false;
	$scope.existedProductCategoryName=false;
	var companyCode="HS";
	
	var vm = this;
    
	// get attribute list
	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 1
	}).success(function(data) {
		vm.attributeUsages=data.value;
	}).error(function(data) {
		// alert('error');
		console.log("error in get attribute list");
  	});
		
	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 2
	}).success(function(data) {
		vm.attributeEmulsionTypes=data.value;
	}).error(function(data) {
		// alert('error');
		console.log("error in get attribute list");
  	});

	$http({
		url : '/product/attributesbycategoryid',
		method : 'POST',
		data : 3
	}).success(function(data) {
		vm.attributeColors=data.value;
	}).error(function(data) {
		// alert('error');
		console.log("error in get attribute list");
  	});

	$scope.CheckProductCategoryName=function(){
		// alert("checkproductcategeryname");
		// $scope.existedProductCategoryName=VerifyExistedProductCategoryName($scope.productCategoryName,
		// $http);
		$http({
			url : '/product/getproductcategorybyname',
			method : 'POST',
			data :  $scope.productCategoryName
		}).success(function(data) {
			var pc = data.value;
			if(pc==null) $scope.existedProductCategoryName=false; 
			 else $scope.existedProductCategoryName=true;
		}).error(function(data) {
			// alert('error');
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
			// alert('error');
			console.log("error to get productcategory ");
		});			
	}
	
	vm.createProductCategory = createProductCategory;
	function createProductCategory() {
	   // alert("to createProductCategory");
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
			validateApiToken(data, $cookies, $rootScope, $modal);
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
		validateApiToken(data, $cookies, $rootScope, $modal);
		vm.productCategories = data.value;
	}).error(function(data) {
		alert('error');
		console.log("error");
	});

/*	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
	                    DTColumnDefBuilder.newColumnDef(1),
	                    DTColumnDefBuilder.newColumnDef(2).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(3).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(4).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(5).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(6).notSortable(),
	                    DTColumnDefBuilder.newColumnDef(7).notSortable() ];*/
	
	vm.updateProductCategory=updateProductCategory;
	function updateProductCategory(index){
		// alert(index+vm.productCategories[index].description);
		$state.go("updateProductCategory", {productCategoryStr: JSON.stringify(vm.productCategories[index])});
	}
	
	vm.productList=productList;
	function productList(index){
		// var pcId=vm.productCategories[index].id;
		$state.go("productList", {productCategoryStr: JSON.stringify(vm.productCategories[index])});
	}
	
	vm.createProductCategory=createProductCategory;
	function createProductCategory(){
		// alert("index: "+index);
		$state.go("createProductCategory");
	}
	
	vm.createProduct=createProduct;
	function createProduct(){
		// alert("index: "+index);
		$state.go("createProduct");
	}
	
}]);

ineuronApp.controller('ProductCategoryUpdateController', ['$scope', '$stateParams', '$http', '$state', '$cookies', '$rootScope', '$modal',
    function($scope, $stateParams, $http, $state, $cookies, $rootScope, $modal) {
	
	var productCategory = eval('(' + $stateParams.productCategoryStr + ')');
	$scope.productCategoryName=productCategory.name;
	$scope.productCategoryDescription=productCategory.description;
	$scope.productCategoryCharacters=productCategory.characters;
	$scope.productCategoryTechParameters=productCategory.techParameters;
	$scope.productCategoryScope=productCategory.scope;
	var codeList=productCategory.code.split("-");
	$scope.existedProductCategoryCode=false;
	$scope.existedProductCategoryName=false;
	var companyCode="HS";
	
	var vm = this;

	// get attribute list
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
		// alert('error');
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
		// alert('error');
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
		// alert('error');
		console.log("error in get attribute list");
	});

	$scope.CheckProductCategoryName=function(){
		// alert("checkproductcategeryname");
		// $scope.existedProductCategoryName=VerifyExistedProductCategoryName($scope.productCategoryName,
		// $http);
		$http({
			url : '/product/getproductcategorybyname',
			method : 'POST',
			data :  $scope.productCategoryName
		}).success(function(data) {
			var pc = data.value;
			// did not change the name
			if(productCategory.name==$scope.productCategoryName)$scope.existedProductCategoryCode=false; 
			else{
			if(pc==null) $scope.existedProductCategoryName=false; 
			 else $scope.existedProductCategoryName=true;
			}
		}).error(function(data) {
			// alert('error');
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
			// did not change code
			if(productCategory.code==$scope.productCategoryCode)$scope.existedProductCategoryCode=false; 
			else{
				if(pc==null) $scope.existedProductCategoryCode=false; 
				 else $scope.existedProductCategoryCode=true;	
			}
			
		}).error(function(data) {
			ineuronApp.confirm("提示","失败！", 'sm', $rootScope, $modal);
			console.log("error to get productcategory ");
		});			
	}
	
	vm.updateProductCategory = updateProductCategory;
	function updateProductCategory() {
		ineuronApp.confirm("确认","确定修改吗？", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				var companyCode="HS";
				var codeStr=companyCode+"-"+$scope.selectedAttributeUsage[0].code+"-"+$scope.selectedEmulsionType[0].code+"-"+$scope.selectedColor[0].code;
				$http({
					url : '/product/updateproductcategory',
					method : 'POST',
					data : {
						id : productCategory.id,
						name : $scope.productCategoryName,
						code: codeStr,
						description : $scope.productCategoryDescription,
						characters: $scope.productCategoryCharacters,
						techParameters: $scope.productCategoryTechParameters,
						scope: $scope.productCategoryScope			
					}
				}).success(function(data) {
					validateApiToken(data, $cookies, $rootScope, $modal);
					ineuronApp.confirm("提示","修改类型成功！", 'sm', $rootScope, $modal);		
					$state.go("productCategoryList");
				}).error(function(data) {
					ineuronApp.confirm("提示","修改失败！", 'sm', $rootScope, $modal);
					console.log("error");
				})
			}
		});				
	}

}]);

