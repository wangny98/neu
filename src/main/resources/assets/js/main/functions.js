var ineuronFuncs = angular.module('ineuron.funcs', []);

//用户管理
ineuronFuncs.userAdmin = {id:"1", name:"用户管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "新增", ticked : false}, 
		{id : "3", operationname : "编辑", ticked : false}, 
		{id : "4", operationname : "删除", ticked : false} 
	],
	output: {}
}

//角色管理
ineuronFuncs.roleAdmin = {id:"2", name:"角色管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "新增", ticked : false}, 
		{id : "3", operationname : "编辑", ticked : false}, 
		{id : "4", operationname : "删除", ticked : false}
	],
	output: {}
}

//产品管理
ineuronFuncs.prodAdmin = {id:"11", name:"产品管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "新增", ticked : false}, 
		{id : "3", operationname : "编辑", ticked : false}, 
		{id : "4", operationname : "删除", ticked : false},
		{id : "5", operationname : "查看工艺流程", ticked : false},
		{id : "6", operationname : "编辑工艺流程", ticked : false}
	],
	output: {}
}

//产品属性管理
ineuronFuncs.prodAttrAdmin = {id:"12", name:"产品属性管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "新增", ticked : false}, 
		{id : "3", operationname : "编辑", ticked : false}, 
		{id : "4", operationname : "删除", ticked : false} 
	],
	output: {}
}

//配方管理
ineuronFuncs.prodFormulaAdmin = {id:"13", name:"配方管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "新增", ticked : false}, 
		{id : "3", operationname : "编辑", ticked : false}, 
		{id : "4", operationname : "删除", ticked : false} 
	],
	output: {}
}

//订单管理
ineuronFuncs.orderAdmin = {id:"21", name:"订单管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "新增", ticked : false}, 
		{id : "3", operationname : "编辑", ticked : false}, 
		{id : "4", operationname : "删除", ticked : false} 
	],
	output: {}
}

ineuronFuncs.funcList = [ineuronFuncs.userAdmin, 
	ineuronFuncs.roleAdmin, 
	ineuronFuncs.prodAdmin,
	ineuronFuncs.prodAttrAdmin,
	ineuronFuncs.prodFormulaAdmin,
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
