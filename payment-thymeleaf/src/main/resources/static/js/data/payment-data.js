var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	else if("type" in options && options.type == "folder") {
		if("additionalParameters" in options && "children" in options.additionalParameters)
			$data = options.additionalParameters.children;
		else $data = {}//no data
	}
	
	if($data != null)//this setTimeout is only for mimicking some random delay
		setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

	//we have used static data here
	//but you can retrieve your data dynamically from a server using ajax call
	//checkout examples/treeview.html and examples/treeview.js for more info
};



var remoteUrl = '/business/function/getFuncsTreeAll';

var remoteDateSource = function(options, callback) {
    var self = this;
     var $data = null;

     if(!("name" in options) && !("type" in options)){
     $.ajax({
     url: remoteUrl,
     data: 'parent_id=0000',
     type: 'POST',
     dataType: 'json',
     success : function(response) {
     if(response.status == "OK")
    	 callback({ data: response.data })
         },
         error: function(response){
        	 
         }
     });
      return;
     }
     else if("type" in options && options.type == "folder") {
     if("additionalParameters" in options && "children" in options.additionalParameters)
     $data = options.additionalParameters.children;//点击父节点，加载子节点
     else $data = {}//no data
     }

     if($data != null)//this setTimeout is only for mimicking some random delay
      setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

};






var sampleData = initiateDemoData();

function initiateDemoData() {
    var tree_data = { '刑侦': { 'text': '刑侦', 'type': 'folder', 'additionalParameters': { 'id': '1', 'children': { '痕迹检验': { 'text': '痕迹检验', 'type': 'item', 'additionalParameters': { 'id': '10' } }, '声像技术': { 'text': '声像技术', 'type': 'item', 'additionalParameters': { 'id': '9', 'item-selected': true } } } } }, '交警': { 'text': '交警', 'type': 'folder', 'additionalParameters': { 'id': '32', 'children': { '交通事故': { 'text': '交通事故', 'type': 'item', 'additionalParameters': { 'id': '33' } }, '交通道理管理': { 'text': '交通道理管理', 'type': 'item', 'additionalParameters': { 'id': '34' } } } } } }
    var dataSource1 = function (options, callback) {
        var $data = null
        if (!("text" in options) && !("type" in options)) {
            $data = tree_data;//the root tree
            callback({ data: $data });
            return;
        }
        else if ("type" in options && options.type == "folder") {
            if ("additionalParameters" in options && "children" in options.additionalParameters)
                $data = options.additionalParameters.children || {};
            else $data = {}//no data
        }

        if ($data != null)//this setTimeout is only for mimicking some random delay
            setTimeout(function () { callback({ data: $data }); }, parseInt(Math.random() * 500) + 200);
    }
    return { 'dataSource1': dataSource1 }
}



var organization_tree_data=function(){
		$.ajax({
   			type : "post",
   			async : false,
   			url : "/payment/checkuserdmoney/"+value,
   			data: {parentid:row_id},  
   		    dataType: "json", 
   			success : function(data) {
   				return data;
   			}
   		});
}


var organizationIdSource = new DataSourceTree({data: organization_tree_data});



var money_useless_tree_data = {
	'yszzgl' : {name: '预算管理资金', type: 'folder'}	,
	'czzhglzj' : {name: '财政专户管理资金', type: 'item'}	,
	'qtzj' : {name: '其他资金', type: 'item'}
}
money_useless_tree_data['yszzgl']['additionalParameters'] = {
	'children' : {
		'ggczyszj' : {name: '公共财政预算资金', type: 'item'},
		'zfxjj' : {name: '政府性基金', type: 'item'},
		'gyzbjyyszj' : {name: '国有资本经营预算资金', type: 'item'},
		'shbxjjyszj' : {name: '社会保险基金预算资金', type: 'item'}
	}
}


var moneyUselessSource = new DataSourceTree({data: money_useless_tree_data});




var origin_index_tree_data_ = {
		'ncys' : {name: '年初预算', type: 'folder'}	,
		'snjy' : {name: '上年结转', type: 'folder'}	,
		'sjbt' : {name: '上级补助', type: 'folder'}	,
		'dwzgzj' : {name: '单位自管资金', type: 'item'}	,
		'bjzj' : {name: '本级追加', type: 'folder'}	,
		'readme' : {name: '暂付款', type: 'item'},
		'manual' : {name: '上年结余', type: 'item'}
	}


origin_index_tree_data_['ncys']['additionalParameters'] = {
		'children' : [
			{name: '年初部门预算列支指标', type: 'item'},
			{name: '年初县级待分配指标', type: 'item'}
		]
	}

origin_index_tree_data_['snjy']['additionalParameters'] = {
		'children' : [
			{name: '县级预算结转指标', type: 'item'},
			{name: '上级补助结转指标', type: 'item'}
		]
	}
origin_index_tree_data_['sjbt']['additionalParameters'] = {
		'children' : [
			{name: '上级一般性转移支付', type: 'item'},
			{name: '上级专项转移支付', type: 'item'}
		]
	}
origin_index_tree_data_['bjzj']['additionalParameters'] = {
		'children' : {
			'xbjzj' : {name: '县本机追加', type: 'item'},
			'bj' : {name: '补助', type: 'folder'}
		}
	}

origin_index_tree_data_['bjzj']['additionalParameters']['children']['bj']['additionalParameters'] = {
		'children' : [
			{name: '事业补助', type: 'item'},
			{name: '办案补助', type: 'item'}
		]
	}

var originIndexDataSource = new DataSourceTree({data: origin_index_tree_data_});