
ineuronApp.clickok = false;

ineuronApp.confirm = function(title, message, size, $rootScope, $modal){ 
	var vm = this;
	var scope = $rootScope.$new();
	scope.data = {
			title:title,
			content:message
	   }
	
	var modalInstance = $modal.open({
		templateUrl : '/ineuron/modaltemplate.html',  
		controller : 'ModalInstanceCtrl',
		size : size, // default:middle; sm, lg
		scope:scope,
		resolve : {
			body : function(){
				return ineuronApp.clickok;
			}
		}
	})
	return modalInstance;
}


ineuronApp.controller('ModalInstanceCtrl',function($scope, $modalInstance, $modal, body){
	$scope.title = $scope.data.title;
    $scope.content=$scope.data.content;
    //alert("title: "+$scope.data.title);
    if($scope.data.title=="确认") 	$scope.showCancelButton=true;
     else $scope.showCancelButton=false;

	$scope.ok = function(){  
		ineuronApp.clickok=true;
		$modalInstance.close(ineuronApp.clickok); 
	};
	$scope.cancel = function(){
		ineuronApp.clickok=false;
		$modalInstance.close(ineuronApp.clickok); 
	}
});

