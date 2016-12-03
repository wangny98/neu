function validateApiToken(data, cookies, $rootScope, $modal) {
	if (data.apiToken == null) {
		alert("会话已过期，请重新登录");
		/*ineuronApp.confirm("提示","会话已过期，请重新登录！", 'sm', $rootScope, $modal).result.then(function(clickok){  
			if(clickok){
				 
			}
		});	*/	
		window.location.href = "/ineuron/user/index.html/#/login";
	}
	cookies.put('INeuron-ApiToken', encodeURI(encodeURI(data.apiToken)), {
		path : "/"
	});
}
