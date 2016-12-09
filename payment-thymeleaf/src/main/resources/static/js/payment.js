jQuery(function($) {
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector)
			.jqGrid(
					{
						url : "/payment/view",
						datatype : "json",
						height : 400,
						colNames : [  '指标编号', '预算单位',  '资金性质',
								'指标来源', '功能分类', '预算项目', '支出结构', '金额', '创建时间',
								'摘要','国库审核状态','预算审核状态'],
						colModel : [
								
								{
									name : 'id',
									index : 'id',
									width : 30,
									sorttype : "int",
									editable : false,
									search:false
								},
								{
									name : 'organizationId',
									index : 'organizationId',
									width : 80,
									editable : true,
									edittype:"select",
									editoptions:{value:gettypes()},
									searchoptions : {
										searchOperMenu : false
									}
								},
								{
									name : 'moneyUseless',
									index : 'moneyUseless',
									width : 80,
									editable : true,
									search:false,
									editoptions:{									
										dataEvents: [
										{type:'focus',fn:function(e){
											bootbox.hideAll();
											$('#moneyUseless').attr("disabled",true);
											var dialog = bootbox.dialog({
											    message: '<p/><div class="widget-box"><div class="widget-header header-color-blue2">'+
												'<h4 class="lighter smaller">选择选项</h4>'+
												'</div>'+

												'<div class="widget-body">'+
													'<div class="widget-main padding-8">'+
														'<div class="tree moneyUseless"></div>'+
//													 '<table id="tree"></table>'+
													'</div>'+
												'</div>',
											    closeButton: true
											});
//											getSelect();
											$('.moneyUseless').ace_tree({
												dataSource: moneyUselessSource ,
												multiSelect:false,
												loadingHTML:'<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
												'open-icon' : 'icon-minus',
												'close-icon' : 'icon-plus',
												'selectable' : true,
												'selected-icon' : 'icon-ok',
												'unselected-icon' : 'icon-remove'
											}).on('selected.fu.tree', function(event,data) {
											   	
											   	 var items = $('.moneyUseless' ).tree('selectedItems' ); 
//												 $('#moneyUselessSpan').html('');
												 $('#moneyUseless').val(items[0].name);
												 $('#moneyUseless').attr("disabled",false);
												 dialog.modal('hide');
											});
										}}]
								}
								},
								{
									name : 'originIndex',
									index : 'originIndex',
									width : 80,
									editable : true,
									editoptions:{									
										dataEvents: [
										{type:'focus',fn:function(e){
											bootbox.hideAll();
											$('#originIndex').attr("disabled",true);
											var dialog = bootbox.dialog({
											    message: '<p/><div class="widget-box"><div class="widget-header header-color-blue2">'+
												'<h4 class="lighter smaller">选择选项</h4>'+
												'</div>'+

												'<div class="widget-body">'+
													'<div class="widget-main padding-8">'+
														'<div class="tree originIndex"></div>'+
													'</div>'+
												'</div>',
											    closeButton: true
											});
											$('.originIndex').ace_tree({
												dataSource: originIndexDataSource ,
												multiSelect:false,
												loadingHTML:'<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
												'open-icon' : 'icon-minus',
												'close-icon' : 'icon-plus',
												'selectable' : true,
												'selected-icon' : 'icon-ok',
												'unselected-icon' : 'icon-remove'
											}).on('selected.fu.tree', function(event,data) {
											   	
											   	 var items = $('.originIndex' ).tree('selectedItems' ); 
//												 $('#moneyUselessSpan').html('');
												 $('#originIndex').val(items[0].name);
												 $('#originIndex').attr("disabled",false);
												 dialog.modal('hide');
											});
										}}]
								},
								searchoptions : {
									searchOperMenu : false
								}
								},
								{
									name : 'functionalClass',
									index : 'functionalClass',
									width : 80,
									editable : true,
									editoptions : {
										size : "20",
										maxlength : "30"
									},
									searchoptions : {
										searchOperMenu : false
									}
								},
								{
									name : 'budgetProject',
									index : 'budgetProject',
									width : 80,
									editable : true,
									searchoptions : {
										searchOperMenu : false
									}
								},
								{
									name : 'expenditureStructure',
									index : 'expenditureStructure',
									width : 80,
									editable : true,
									edittype:"select",
									editoptions:{value:"县级支出:县级支出;乡镇支出:乡镇支出"},
									searchoptions : {
										searchOperMenu : false
									}
//									
								},
								
								{
									name : 'moneySums',
									index : 'moneySums',
									width : 80,
									sortable : false,
									editable : true,
//									formatter: 'number',
									searchoptions : {
										searchOperMenu : true,
										sopt : ['eq','gt','lt']
									},
									searchrules : {
										"required": true,
										"number" : true,
										"minValue": 0 
									}
								},{
									name : 'creationTime',
									index : 'creationTime',
									sorttype:'time',
									formatter: 'time',
									
									srcformat: 'Y-m-d hh:mm:ss',
									width : 100,
									editable : false,
			                        searchoptions: {
			                        	searchOperMenu : false,
			                            // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
			                            // use it to place a third party control to customize the toolbar
			                            dataInit: function (element) {
			                            	
			                               $(element).datepicker({
//												autoclose: true,
////												format: 'Y-m-d',
//												dateFormat: 'yy-mm-dd',
//												orientation : 'bottom'
			                            	   format: 'yyyy-mm', 
			                            	   weekStart: 1, 
			                            	   autoclose: true, 

			                            	   startView: 2, 
			                            	   maxViewMode: 1,
			                            	   minViewMode:1,
//			                            	   forceParse: false, 
			                            	   language: 'zh-CN' ,
			                            	   showOn: 'focus'
			                                });
			                               $("#gs_caption").focus();
			                            }
								
								
			                        }
								},								{
									name : 'caption',
									index : 'caption',
									width : 80,
									sortable : false,
									editable : true,
									edittype : "textarea",
									editoptions : {
										rows : "2",
//										cols : "10"
									},
									searchoptions : {
										searchOperMenu : false
									}
								},{
									name : 'state1',
									label : 'state1',
									width : 60,
									sortable : false,
									editable : false,
									formatter:currencyFmatter,
									stype: "select",				                      
									searchoptions : {
										searchOperMenu : false,
										value: ":[所有状态];0:未审核;1:审核通过;2:审核未通过" 
			                    
									}
								},{
									name : 'state2',
									label : 'state2',
									width : 60,
									sortable : false,
									editable : false,
									formatter:currencyFmatter,
									stype: "select",				                      
									searchoptions : {
										searchOperMenu : false,
										value: ":[所有状态];0:未审核;1:审核通过;2:审核未通过" 
			                    
									}
								}],

						jsonReader : {
							root : "content",
							page : "currpage",
							total : "totalPages",
							records : "totalElements"
						},
						emptyrecords : "查询结果为空!",
						viewrecords : true,
						rowNum : 10,
						pager : pager_selector,
						altRows : true,
	
						multiselect : true,
						editurl :"/payment/update", 
																// saved
//						caption : "指标管理",

						autoScroll : true,
						autowidth : true,
						
						subGrid: true,
						subGridRowExpanded: function(subgrid_id, row_id) {
						      var subgrid_table_id, pager_id;
						      subgrid_table_id = subgrid_id+"_t";
						      pager_id = "p_"+subgrid_table_id;
						      $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' ></table><div id='"+pager_id+"'></div>");
						      jQuery("#"+subgrid_table_id).jqGrid({
						        url : "/payment/view/"+row_id,
						        datatype: "json",
//						        loadonce: true,
						        colNames : [  '指标编号', 
//						                      '资金用处',
//												'指标来源', '功能分类', '预算项目', '支出结构',
						                      '金额','创建时间',
												'摘要','国库审核状态','预算审核状态'],
												colModel : [
																{
																	name : 'id',
																index : 'id',
																width : 40,
																sorttype : "int",
																	editable : false
																},
																//{
																//	name : 'moneyUseless',
																//	label : 'moneyUseless',
																//	width : 80,
																//	editable : false
																//},
																//{
																//	name : 'originIndex',
																//	label : 'originIndex',
																//	width : 80,
																//	editable : false,
																//	editoptions : {
																//		size : "20",
																//		maxlength : "30"
																//	}
																//},
																//{
																//	name : 'functionalClass',
																//	label : 'functionalClass',
																//	width : 80,
																//	editable : false,
																//	editoptions : {
																//		size : "20",
																//		maxlength : "30"
																//	}
																//},
																//{
																//	name : 'budgetProject',
																//	label : 'content.budgetProject',
																//	width : 80,
																//	editable : true
																//},
																//{
																//	name : 'expenditureStructure',
																//	label : 'expenditureStructure',
																//	width : 80,
																//	editable : true,
																//	edittype : "text"
																////	
																//},
																
																{
																	name : 'moneyUsed',
																label : ' 资金用处',
																width : 80,
																sortable : false,
																editable : true,
																formatter:'currency',
																editrules:{
																	required:true,
																	size : "30",
																	minValue :1,
																	custom:true,
																	custom_func:function(value, colname) {
																		
																		var message="";
																		var result=false;
																		
																		
																		
																		var z= /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
																		
																		if(z.test(value)){
																		 
																		
																		
																   		$.ajax({
																   			type : "post",
																   			async : false,
																   			url : "/payment/checkuserdmoney/"+value,
																   			data: {parentid:row_id},  
																   		    dataType: "json", 
																   			success : function(data) {
																			if (data != true) {
																				
																				message="金额之和大于总指标金额";
																				
																			}else{
																				message="";
																				result=true;
																			}
																
																			
																		},error: function () {
																			message="服务器连接失败，请重新登录";
																			
																        }
																
																   		});
																		}else{
																			message="请输入有效的金额，小数点后面保留2位";
																			};
																       		return [result,message];
																		}
																	}
																},
																{
																	name : 'creationTime',
																index : 'creationTime',
																sorttype:'time',
																formatter: 'time',
																//	srcformat: 'Y-m-d hh:mm:ss',
																	width : 100,
																	editable : false
																},
																{
																	name : 'caption',
																index : 'caption',
																width : 200,
																sortable : false,
																editable : true,
																edittype : "textarea",
																editoptions : {
																	rows : "2",
																	cols : "55"
																	}
																},{
																	name : 'state2',
																index : 'state2',
																	width : 80,
																	sortable : false,
																	editable : false,
																	formatter:currencyFmatter
																},{
																	name : 'state1',
																index : 'state1',
																	width : 80,
																	sortable : false,
																	editable : false,
																	formatter:currencyFmatter
																} ],

								jsonReader : {
									root : "page.content",
									page : "page.currpage",
									total : "page.totalPages",
									records : "page.totalElements",
									userdata: "userdata"
//									userdata: function (obj) { return obj.remove(id)}
								},
						          rowNum:5,
						          sortname: 'id',
						          emptyrecords : "子指标为空!",
						          editurl :"/payment/update/"+row_id, 
						          sortorder: "asc",
						          pager: pager_id,
						          footerrow: true,
					              userDataOnFooter: true, // use the userData parameter of the JSON response to display data on footer
						          autowidth : true,
						          multiselect : true
						      });
						      
						      
						      jQuery("#"+subgrid_table_id).jqGrid('navGrid',"#"+pager_id,{edit:true,add : true,search : false,del:true,view : true},{
									
									recreateForm : true
								

								},
								{
									
									closeAfterAdd : true,
									recreateForm : true,
									viewPagerButtons : false
//									afterComplete:function (a,b,c) {alert("123123"+a.responseText)}
								


								
								},
								{
									// delete record form
//									recreateForm : true,
									
								})
						    }
						

					});
	 $(grid_selector).closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });

	 
    
	


	jQuery(grid_selector).jqGrid(
			'navGrid',
			pager_selector,
			{ 
				edit : true,
				add : true,
				del : true,
				search : true,
				refresh : true,
				view : true
			},
			{
				
				recreateForm : true,
			

			},
			{
				
				closeAfterAdd : true,
				recreateForm : true,
				viewPagerButtons : false,
			


			
			},
			{
				// delete record form
				recreateForm : true,
				
			},
			{
				// search form
				recreateForm : true,
				multipleSearch : true,
			
			},
			{
				recreateForm : true,
				
			})
			
			jQuery(grid_selector).navButtonAdd(pager_selector, {  
	               caption: "excel",  
	               title:"excel",  
	               buttonicon: "ace-icon fa fa-globe blue",  
	               onClickButton: function () {  
	                   
	                   
	                   var rowIds = jQuery(grid_selector).jqGrid('getDataIDs');
	                   
	                   if(rowIds!=""){
//	                	   alert(rowIds);
	               		$.ajax({
	               			type : "post",
	               			async : false,
	               			url : "/payment/exportexcel",
	               			data: {ids:JSON.stringify(rowIds)},  
//                   		    dataType: "json", 
	               			success : function(data) {
	         				if(data!=""){
//	         					alert(data);
//	         					window.open(data);
	         					window.location.href=data; 
//	         					window.location.href(data);
	         				}

	         				
	         			},error: function () {
	         				message="服务器连接失败，请重新登录";
	    					
	                    }

	               		});
	                   }else{
	                	   alert("当前页面没有数据");
	                   }
	                   
	               },  
	               position: "last"  
	           })  
			
			$(grid_selector).jqGrid('filterToolbar',{
                // JSON stringify all data from search, including search toolbar operators
                stringResult: true,
                // instuct the grid toolbar to show the search options
                searchOperators: true
            });


	$("#gsh_grid-table_state1 .ui-search-table .ui-search-clear").empty();
	$("#gsh_grid-table_state2 .ui-search-table .ui-search-clear").empty();
	
	

});

function gettypes() {

	// 动态生成select内容

	var str = "";

	$.ajax({

		type : "post",

		async : false,

		url : "/business/organization/organizationlist",

		success : function(data) {

			if (data != null) {

				var jsonobj = eval(data);

				var length = jsonobj.length;

				for (var i = 0; i < length; i++) {

					if (i != length - 1) {

						str += jsonobj[i].organizationName+ ":"
								+ jsonobj[i].organizationName + ";";

					} else {

						str += jsonobj[i].organizationName+ ":"
								+ jsonobj[i].organizationName;// 这里是option里面的 value:label

					}

				}

				//$.each(jsonobj, function(i){

				//str+="personType:"+jsonobj[i].personType+";"

				//$("<option value='" + jsonobj[i].personType + "'>" + jsonobj[i].personType+ "</option>").appendTo(typeselect);

				//});

			}

//			alert(str);

		}

	});

	return str;

}


function currencyFmatter (cellvalue, options, rowObject)  
{  
   if(cellvalue=="2"){

	   return "审核未通过"; 
   }else if(cellvalue=="1")
	   return "审核通过"; 
	else if(cellvalue=="0")
	   return "未审核"; 
	else
		return cellvalue;
}  
//enable datepicker
function pickDate( element ) {
	setTimeout(function(){
		$(element) .find('input[type=text]')
				.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
	}, 0);
}

