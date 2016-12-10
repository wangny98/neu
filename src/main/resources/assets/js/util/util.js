function validateApiToken(data, cookies, $rootScope, $modal) {
	if (data.apiToken == null) {
		ineuronApp.confirm("提示", "会话已过期，请重新登录！", 'sm', $rootScope, $modal).result.then(function(clickok){
			if(clickok){
				window.location.href = "/ineuron/user/index.html/#/login";
			}
		})		
	}
	
}

function hasPermission(funcId) {
	var allPermissionsStr = getCookie('INeuron-allPermissions');
	alert(allPermissionsStr);
	var allPermissions = eval('(' + allPermissionsStr + ')');
	var funcParts = funcId.split("-");
	if(funcParts.length == 1){
		
	}else if(funcParts.length == 2){
		
	}else{
		return false;
	}
}

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

/*function VerifyExistedProductCategoryName(productCategoryName, $http){
 $http({
 url : '/product/getproductcategorybyname',
 method : 'POST',
 data :  productCategoryName
 }).success(function(data) {
 var pc = data.value;
 alert(pc.name);
 if(pc==null) return false; 
 else return true;
 }).error(function(data) {
 //alert('error');
 console.log("error to get productcategory ");
 return false;
 });		
 }*/

function clone(obj) {
	var o;
	if (typeof obj == "object") {
		if (obj === null) {
			o = null;
		} else {
			if (obj instanceof Array) {
				o = [];
				for (var i = 0, len = obj.length; i < len; i++) {
					o.push(clone(obj[i]));
				}
			} else {
				o = {};
				for ( var j in obj) {
					o[j] = clone(obj[j]);
				}
			}
		}
	} else {
		o = obj;
	}
	return o;
}
