

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
				if (row === $scope.model.selected){
					var operationId = $scope.model.selected.operationId;
					var operationTypeId = getOperationTypeId(operationId);
					if(operationTypeId == 1){
						return 'editMaterial';
					}else{
						return 'editOp';
					}
				}
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
			
			function getOperationTypeId(operationId){
				for(index in $scope.operations){
					if(operationId == $scope.operations[index].id){
						return $scope.operations[index].typeId; 
					}
				}
				return 0;
			}

		} 
	]);

