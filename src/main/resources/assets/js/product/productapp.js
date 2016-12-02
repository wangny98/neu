
ineuronApp.controller('ProductCreateController', [ '$scope', '$stateParams',
		'$http', '$state', '$cookies',
		function($scope, $stateParams, $http, $state, $cookies) {

			var vm = this;

			vm.createProduct = createProduct;
			function createProduct() {
				// alert("to createProduct");
				$http({
					url : '/product/create',
					method : 'POST',
					data : {
						productname : $scope.productName,
						productcode : $scope.productCode,
						description : $scope.productDescription
					}
				}).success(function(data) {
					// validateApiToken(data, $cookies);
					$state.go("productManagement");
				}).error(function(data) {
					alert('error');
					console.log("error");
				})
			}

		} ]);

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
		'DTOptionsBuilder',
		'DTColumnDefBuilder',
		function($http, $stateParams, $scope, $location, $cookies, $state, DTOptionsBuilder,
				DTColumnDefBuilder) {
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
						alert("保存成功！");
					}
					else{
						alert("保存失败！");
					}
				}).error(function(data) {
					alert("保存失败！");
					console.log("error");
				})
			}

		} ]);
