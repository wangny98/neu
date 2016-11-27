//define the package as loginApp
var loginApp = angular.module('loginApp', [ 'ngRoute', 'ngCookies','ui.bootstrap' ]);

loginApp.config(function($routeProvider) {

	$routeProvider.when('/login', {

		templateUrl : '/ineuron/user/login.html',

		controller : 'UserLoginController'

	}).

	when('/register', {

		templateUrl : '/ineuron/user/register.html',

		controller : 'UserRegisterCtrl'

	}).

	otherwise({

		redirectTo : '/login'

	});

});

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('n.y(\'Z\',[\'$w\',\'$z\',\'$8\',\'$V\',\'$U\',\'$R\',0(e,f,g,h,i,j){e.B=K;e.m=0(d){f({o:\'/p/J\',r:\'s\',t:{3:e.3,4:e.4}}).5(0(a){I(a.5==l){h.6(\'7-H\',e.3,{1:"/"});h.6(\'7-O\',E(E(a.G)),{1:"/"});D b=x.q(a.C.A);D c=x.q(a.C.v);h.6(\'7-v\',c,{1:"/"});h.6(\'7-A\',b,{1:"/"});L.8.M="/N/10.P"}Q{e.B=l}}).2(0(a){S(a.T+"2");9.k("2")})}}]);n.y(\'W\',[\'$w\',\'$z\',\'$8\',0(b,c,d){b.X=0(){c({o:\'/p/Y\',r:\'s\',t:{3:b.3,u:b.u,F:b.F,4:b.4}}).5(0(a){d.1("/m");9.k("5!")}).2(0(a){9.k("2")})}}]);',62,63,'function|path|error|username|password|success|put|INeuron|location|console|||||||||||log|true|login|loginApp|url|user|stringify|method|POST|data|firstname|roleList|scope|JSON|controller|http|allPermissions|invalidUserPwd|value|var|encodeURI|lastname|apiToken|UserName|if|authenticate|false|window|href|ineuron|ApiToken|html|else|modal|alert|message|rootScope|cookies|UserRegisterCtrl|submitReg|register|UserLoginController|main'.split('|'),0,{}))