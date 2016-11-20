var ineuronFuncs = angular.module('ineuron.funcs', []);

//用户管理
ineuronFuncs.userAdmin = {id:"1", name:"用户管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

//角色管理
ineuronFuncs.roleAdmin = {id:"5", name:"角色管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

//产品管理
ineuronFuncs.prodAdmin = {id:"2", name:"产品管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

//订单管理
ineuronFuncs.orderAdmin = {id:"3", name:"订单管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

ineuronFuncs.funcList = [ineuronFuncs.userAdmin, 
	ineuronFuncs.roleAdmin, 
	ineuronFuncs.prodAdmin, 
	ineuronFuncs.orderAdmin
];

ineuronFuncs.getFuncs = function(){
	ineuronFuncs.resetFuncs();
	return ineuronFuncs.funcList;
}

ineuronFuncs.resetFuncs = function(){
	for(var i in ineuronFuncs.funcList) {
		var func = ineuronFuncs.funcList[i];
		for(var j in func.ops){
			func.ops[j].ticked = false;
		}	
			
	}
}

ineuronFuncs.getFunc = function(id){
	for(var i in ineuronFuncs.funcList) {
		if(ineuronFuncs.funcList[i].id == id){
			return ineuronFuncs.funcList[i];
		}
	}
	return null;
}
