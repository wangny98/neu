function validateApiToken(data, cookies) {
	if (data.apiToken == null) {
		alert("�Ự�ѹ��ڣ������µ�¼");
		window.location.href = "/ineuron/user/index.html/#/login";
	}
	cookies.put('INeuron-ApiToken', encodeURI(encodeURI(data.apiToken)), {
		path : "/"
	});
}
