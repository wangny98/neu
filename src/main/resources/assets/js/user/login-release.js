var ineuronApp = angular.module('ineuronApp', [ 'ngRoute', 'ngCookies','ui.bootstrap' ]);

ineuronApp.config(function($routeProvider) {

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

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('n.D(\'18\',[\'$y\',\'$z\',\'$r\',\'$17\',\'$J\',\'$N\',0(e,f,g,h,i,j){e.G=s;e.L=0(d){f({v:\'/5/W\',o:\'p\',q:{2:e.2,3:e.3}}).4(0(a){k(a.4==m){h.9(\'7-V\',e.2,{6:"/"});h.9(\'7-T\',A(A(a.S)),{6:"/"});t b=H.I(a.u.K);t c=H.I(a.u.M);h.9(\'7-M\',c,{6:"/"});h.9(\'7-K\',b,{6:"/"});R.r.O="/10/P.Q"}w{e.G=m}}).1(0(a){C(a.U+"1");8.l("1")})}}]);n.D(\'X\',[\'$y\',\'$J\',\'$N\',\'$z\',\'$r\',0(c,d,e,f,g){c.Y=0(){f({v:\'/5/5\',o:\'p\',q:c.2}).4(0(a){t b=a.u;k(b==Z)c.F=s;w c.F=m}).1(0(a){C(\'1\');8.l("1 11 12 5")})}c.13=0(){k(c.3!=c.14)c.E=m;w c.E=s}c.15=0(){f({v:\'/5/16\',o:\'p\',q:{2:c.2,B:c.B,x:c.x,3:c.3}}).4(0(b){n.19("提示","注册成功！请登录。",\'1a\',d,e).1b.1c(0(a){k(a){}});g.6("/L");8.l("4!")}).1(0(a){8.l("1")})}}]);',62,75,'function|error|username|password|success|user|path|INeuron|console|put|||||||||||if|log|true|ineuronApp|method|POST|data|location|false|var|value|url|else|lastname|scope|http|encodeURI|firstname|alert|controller|inconsistentPwd|existedUsername|invalidUserPwd|JSON|stringify|rootScope|allPermissions|login|roleList|modal|href|main|html|window|apiToken|ApiToken|message|UserName|authenticate|UserRegisterCtrl|usernameCheck|null|ineuron|to|get|pwdConsistenceCheck|password2|submitReg|register|cookies|UserLoginController|confirm|sm|result|then'.split('|'),0,{}))