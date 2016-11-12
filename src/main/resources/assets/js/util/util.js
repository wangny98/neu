function validateApiToken(data, cookies) {
	if (data.apiToken == null) {
		alert("会话已过期，请重新登录");
		window.location.href = "/ineuron/user/index.html/#/login";
	}
	cookies.put('INeuron-ApiToken', encodeURI(encodeURI(data.apiToken)), {
		path : "/"
	});
}
