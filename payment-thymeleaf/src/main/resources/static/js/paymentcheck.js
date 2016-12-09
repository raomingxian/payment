jQuery(function($) {
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector)
			.jqGrid(
					{
						url : "/payment/view/check",
						datatype : "json",
						height : 400,
						colNames : [  '指标编号', '预算单位', '归口科处室', '资金性质',
								'指标来源', '功能分类', '预算项目', '支出结构', '金额', 
								'摘要','审核状态'],
						colModel : [
								
								{
									name : 'id',
									index : 'id',
									width : 30,
									sorttype : "int",
									editable : false
								},
								{
									name : 'organizationId',
									index : 'organizationId',
									width : 80,
									editable : false
								},
								{
									name : 'sysDepartment.departmentName',
									index : 'departmentName',
									width : 80,
									editable : false
								},
								{
									name : 'moneyUseless',
									index : 'moneyUseless',
									width : 60,
									editable : false
								},
								{
									name : 'originIndex',
									index : 'originIndex',
									width : 60,
									editable : false
								},
								{
									name : 'functionalClass',
									index : 'functionalClass',
									width : 60,
									editable : false
								},
								{
									name : 'budgetProject',
									index : 'content.budgetProject',
									width : 60,
									editable : false
								},
								{
									name : 'expenditureStructure',
									index : 'expenditureStructure',
									width : 60,
									editable : false
//									
								},
								
								{
									name : 'moneySums',
									index : 'moneySums',
									width : 60,
									sortable : true,
									editable : false
								},
								{
									name : 'caption',
									index : 'caption',
									search:false,
									width : 60,
									editable : false
								},{
									name : 'state1',
									index : 'state1',
									width : 60,
									sortable : false,
									editable : false,
//									search:false,
									formatter:currencyFmatter
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

						autoScroll : true,
						autowidth : true,
						
						subGrid: true,
						subGridRowExpanded: function(subgrid_id, row_id) {
						      var subgrid_table_id, pager_id;
						      subgrid_table_id = subgrid_id+"_t";
						      pager_id = "p_"+subgrid_table_id;
						      $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' ></table><div id='"+pager_id+"'></div>");
						      jQuery("#"+subgrid_table_id).jqGrid({
						        url : "/payment/view/check/"+row_id,
						        datatype: "json",
//						        loadonce: true,
						        colNames : [  '指标编号',  '资金用处',
												'指标来源', '功能分类', '预算项目', '支出结构', '金额',
												'摘要','审核状态'],
												colModel : [
															{
																name : 'id',
																label : 'id',
																width : 200,
																sorttype : "int",
																editable : false
															},
															{
																name : 'moneyUseless',
																label : 'moneyUseless',
																width : 80,
																editable : false
															},
															{
																name : 'originIndex',
																label : 'originIndex',
																width : 80,
																editable : false,
																editoptions : {
																	size : "20",
																	maxlength : "30"
																}
															},
															{
																name : 'functionalClass',
																label : 'functionalClass',
																width : 80,
																editable : false,
																editoptions : {
																	size : "20",
																	maxlength : "30"
																}
															},
															{
																name : 'budgetProject',
																label : 'content.budgetProject',
																width : 80,
																editable : false
															},
															{
																name : 'expenditureStructure',
																label : 'expenditureStructure',
																width : 80,
																editable : false
//																
															},
															
															{
																name : 'moneyUsed',
																label : 'moneyUsed',
																width : 80,
																sortable : false,
																editable : false
															},
															
															{
																name : 'caption',
																label : 'caption',
																width : 120,
																sortable : false,
																editable : false
															},{
																name : 'state1',
																label : 'state1',
																width : 120,
																sortable : false,
																editable : false
															} ],

								jsonReader : {
									root : "page.content",
									page : "page.currpage",
									total : "page.totalPages",
									records : "page.totalElements",
									userdata: "userdata"
								},
						          rowNum:5,
						          sortname: 'id',
						          emptyrecords : "子指标为空!",
						          editurl :"/payment/update/"+row_id, 
						          sortorder: "asc",
						          pager: pager_id,
						          altRows : true,
						          footerrow: true,
					              userDataOnFooter: true, // use the userData parameter of the JSON response to display data on footer
						          autowidth : true,
						          multiselect : true
						      });
						      
						      
						      jQuery("#"+subgrid_table_id).jqGrid('navGrid',"#"+pager_id,{edit:false,add : false,search : false,del:false,view : false},{
									
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
				edit : false,
				add : false,
				del : false,
				search : true,
				refresh : true,
				view : false
			})
			
			
			jQuery(grid_selector).navButtonAdd(pager_selector, {  
	               caption: "审核",  
	               title:"审核",  
	               buttonicon: "ace-icon fa fa-globe blue",  
	               onClickButton: function () {  
	                   var s;  
	                  //多选获取  
	                   s = jQuery(grid_selector).jqGrid('getGridParam', 'selarrrow'); 
	                   
	                   if(s!=""){
	                   bootbox.confirm({
	                       title: "审核",
	                       message: "&nbsp;&nbsp;&nbsp;&nbsp;是否通过审核？",
	                       buttons: {
	                           cancel: {
	                               label: '<i class="fa fa-times"></i> 否'
	                           },
	                           confirm: {
	                               label: '<i class="fa fa-check"></i> 是'
	                           }
	                       },
	                       callback: function (result) {
//	                           console.log('This was logged in the callback: ' + result);
//	                    	   alert(s);
	                   		$.ajax({
	                   			type : "post",
	                   			async : false,
	                   			url : "/payment/ysstatus/"+result,
	                   			contentType: 'application/json;charse=UTF-8',
	                   			data: JSON.stringify(s),
	                   			
	                   		    dataType: "json", 
	            
	                   		});
	                   		jQuery(grid_selector).trigger("reloadGrid"); 
	                       }
	                   });
	               }else{
	            	   alert("请选择最少一行记录");
	               }
	               
	                   
	               },  
	               position: "last"  
	           })  

	function gettypes() {

		// 动态生成select内容

		var str = "";

		$.ajax({

			type : "post",

			async : false,

			url : "checkpersontype",

			success : function(data) {

				if (data != null) {

					var jsonobj = eval(data);

					var length = jsonobj.length;

					for (var i = 0; i < length; i++) {

						if (i != length - 1) {

							str += jsonobj[i].personType + ":"
									+ jsonobj[i].personType + ";";

						} else {

							str += jsonobj[i].personType + ":"
									+ jsonobj[i].personType;// 这里是option里面的 value:label

						}

					}
				}

				alert(str);

			}

		});

		return str;

	}
	
	
	
	/**
	* 审核or反审核划款指令
	*/
	var check = function()
	{
	//已选中行的所有ID集合
	var rowId = getRowIds('list');

	//判断是否选择了记录
	if(rowId.length == 0){
	yssAlert("请选择需要操作的数据！",300,150);
	return ;
	}

	//"审核/反审核"按钮名称
	var butName = document.getElementById('btn_check').children[0].innerText;
	//根据“审核/反审核”按钮名称，去除无需操作的记录
	var reRowId = checkAndUncheck('已' + butName,rowId);

	transferOrderService.checkOrUncheck(reRowId, butName, {
	callback : function(){
	yssSucceed(""+butName+"成功！",300,150);
	$("#list").trigger("reloadGrid");
	},exceptionHandler : function(message){yssError(message,750,150);}
	});
	}; 
	
	function currencyFmatter (cellvalue, options, rowObject)  
	{  
	   if(cellvalue=="2"){

		   return "审核未通过"; 
	   }else if(cellvalue=="1")
		   return "审核通过"; 
		else 
		   return "未审核"; 
	}  

});


