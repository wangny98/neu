//用户管理
var userAdmin = {id:"1", name:"用户管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

//角色管理
var roleAdmin = {id:"5", name:"角色管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

//产品管理
var prodAdmin = {id:"2", name:"产品管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

//订单管理
var orderAdmin = {id:"3", name:"订单管理", ops:[ 
		{id : "1", operationname : "查询", ticked : false}, 
		{id : "2", operationname : "编辑", ticked : false}, 
		{id : "3", operationname : "打印", ticked : false}, 
		{id : "4", operationname : "报表", ticked : false} 
	],
	output: {}
}

var funcList = [userAdmin, roleAdmin, prodAdmin, orderAdmin];

function resetFuncs(){
	for(var i in funcList) {
		var func = funcList[i];
		for(var j in func.ops){
			func.ops[j].ticked = false;
		}	
			
	}
}
function getFunc(id){
	for(var i in funcList) {
		if(funcList[i].id == id){
			return funcList[i];
		}
	}
	return null;
}
