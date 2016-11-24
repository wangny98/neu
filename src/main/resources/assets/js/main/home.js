var homeApp = angular.module('homeApp', ['ngCookies']);

homeApp.controller('HomeController', ['$http', '$cookies', '$scope',
	function($http, $cookies, $scope){
		$http({
		  method: 'GET',
		  url: '/user/validateloginstatus'
		}).success(
				function(data) {
					if (data.success == true) {
						$cookies.put('INeuron-ApiToken',
								encodeURI(encodeURI(data.apiToken)), {
									path : "/"
								});
						window.location.href = "/ineuron/main.html";
					} else {
						window.location.href = "/ineuron/user/index.html/#/login";
					}

				}).error(function(data) {
					alert(data.message+"error");
					console.log("error");
		})
	}
])
	
