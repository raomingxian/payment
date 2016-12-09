
	
jQuery(function($) {
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector)
			.jqGrid(
					{
						url : "/payment/view",
						datatype : "json",
						height : 400,
						colNames : [  '指标编号', '预算单位', '归口科处室', '资金性质',
								'指标来源', '功能分类', '预算项目', '支出结构', '金额', '年初已用金额',
								'摘要'],
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
									editable : true
								},
								{
									name : 'manageDepartment',
									index : 'manageDepartment',
									width : 80,
									editable : true,
									edittype:"select",
									editoptions:{value:"预算股:预算股;国库股:国库股;行政执法股:行政执法股;教科文股:教科文股;经建股:经建股;农业股:农业股;社保股:社保股;乡财局:乡财局;综合股:综合股;信息中心:信息中心;综改办:综改办;非税收入局:非税收入局"}
									
								},
								{
									name : 'moneyUseless',
									index : 'moneyUseless',
									width : 80,
									editable : true,
									editoptions:{									
										dataEvents: [
//										             {type:'focus',fn:function(e){
//										//TODO 下拉后增加后，选择数据字典项目 
//										//debugger;
//											$('#moneyUselessSpan').html('');
//											var $attrTypeSel = $( e.target );
//											
//											$attrTypeSel.after('<span id="moneyUselessSpan"><div class="widget-box"><div class="widget-header header-color-blue2">'+
//												'<h4 class="lighter smaller">选择选项</h4>'+
//												'</div>'+
//
//												'<div class="widget-body">'+
//													'<div class="widget-main padding-8">'+
//														'<div id="tree1" class="tree"></div>'+
//													'</div>'+
//												'</div></span>');
//											$('#tree1').ace_tree({
//												dataSource: treeDataSource ,
//												multiSelect:false,
//												loadingHTML:'<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
//												'open-icon' : 'icon-minus',
//												'close-icon' : 'icon-plus',
//												'selectable' : true,
//												'selected-icon' : 'icon-ok',
//												'unselected-icon' : 'icon-remove'
//											}).on('selected.fu.tree', function(event,data) {
//											   	
//											   	 var items = $('#tree1' ).tree('selectedItems' ); 
//												 $('#moneyUselessSpan').html('');
//												 $('#moneyUseless').val(items[0].name);
//											});
//											
//											
////											$attrTypeSel.remove();
//									}
										{type:'focus',fn:function(e){
											bootbox.hideAll()
											var dialog = bootbox.dialog({
											    message: '<p/><div class="widget-box"><div class="widget-header header-color-blue2">'+
												'<h4 class="lighter smaller">选择选项</h4>'+
												'</div>'+

												'<div class="widget-body">'+
													'<div class="widget-main padding-8">'+
														'<div class="tree moneyUseless"></div>'+
													'</div>'+
												'</div>',
											    closeButton: true
											});
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
											bootbox.hideAll()
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
												 dialog.modal('hide');
											});
										}}]
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
									}
								},
								{
									name : 'budgetProject',
									index : 'content.budgetProject',
									width : 80,
									editable : true,
									edittype : "checkbox",
									editoptions : {
										value : "Yes:No"
									},
									unformat : aceSwitch
								},
								{
									name : 'expenditureStructure',
									index : 'expenditureStructure',
									width : 80,
									editable : true,
									edittype:"select",
									editoptions:{value:"县级支出:县级支出;乡镇支出:乡镇支出"}
//									
								},
								
								{
									name : 'moneySums',
									index : 'moneySums',
									width : 80,
									sortable : false,
									editable : true,
									editoptions:{									
										dataEvents: [{type:'focus',fn:function(e){
										//TODO 下拉后增加后，选择数据字典项目 
										//debugger;
											$('#dataItemSpan').html('');
											var $attrTypeSel = $( e.target );
											var attrType = $attrTypeSel.val();
											$attrTypeSel.before('<span id="dataItemSpan"><select id="rule" style="width:168.38px;" class="FormElement" role="select"><optgroup label="A"> <option value="ttt">tt</option><option value="ttt">tt</option></optgroup><optgroup label="B"><option value="ttt">tt</option><option value="ttt">tt</option><option value="ttt">tt</option></optgroup"></select></span>');
											$attrTypeSel.remove();
									}}]
								},
//								formoptions:{colpos:3,rowpos:1,elmsuffix:'<font color="red" >*</font>'},
								},
								{
									name : 'moneyUsed',
									index : 'moneyUsed',
									width : 80,
									sortable : false,
									editable : true,
									edittype : "textarea",
									editoptions : {
										rows : "2",
//										cols : "10"
									}
								},
								{
									name : 'caption',
									index : 'content.caption',
									width : 80,
									sortable : false,
									editable : true,
									edittype : "textarea",
									editoptions : {
										rows : "2",
//										cols : "10"
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
//						multiselect: false,
					    
	                
			         
			                      
						loadComplete : function() {
							var table = this;
							setTimeout(function() {
								styleCheckbox(table);

								updateActionIcons(table);
								updatePagerIcons(table);
								enableTooltips(table);
							}, 0);
						},

						editurl :"/payment/update",// nothing is
																// saved
						caption : "指标管理",

						autoScroll : true,
						autowidth : true,
						
						subGrid: true,
				      
					    subGridOptions:{
					    	"plusicon" : "icon-plus-sign purple",//展开图标
					    	"minusicon" : "icon-plus-sign purple",//收缩图标
					    	"openicon" : "ace-icon fa fa-chevron-right center orange"//打开时左侧图标
			                },
						subGridRowExpanded: function(subgrid_id, row_id) {
						      var subgrid_table_id, pager_id;
						      subgrid_table_id = subgrid_id+"_t";
						      pager_id = "p_"+subgrid_table_id;
						      $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' ></table><div id='"+pager_id+"'></div>");
						      jQuery("#"+subgrid_table_id).jqGrid({
						        url : "/payment/view/"+row_id,
						        datatype: "json",
						        loadonce: true,
						        colNames : [ '操作', '指标编号',  '资金用处',
												'指标来源', '功能分类', '预算项目', '支出结构', '金额',
												'摘要'],
												colModel : [
															{
																name : 'myac',
																index : '',
																width : 80,
																fixed : true,
																sortable : false,
																resize : false,
																formatter : 'actions',
																formatoptions : {
																	keys : true,

																	delOptions : {
																		recreateForm : true,
																		beforeShowForm : beforeDeleteCallback
																	},
																	addformbutton:true,
																// editformbutton:true,
																// editOptions:{recreateForm: true,
																// beforeShowForm:beforeEditCallback}
																}
															},
															{
																name : 'id',
																index : 'id',
																width : 200,
																sorttype : "int",
																editable : false
															},
															{
																name : 'moneyUseless',
																index : 'moneyUseless',
																width : 80,
																editable : false
															},
															{
																name : 'originIndex',
																index : 'originIndex',
																width : 80,
																editable : false,
																editoptions : {
																	size : "20",
																	maxlength : "30"
																}
															},
															{
																name : 'functionalClass',
																index : 'functionalClass',
																width : 80,
																editable : false,
																editoptions : {
																	size : "20",
																	maxlength : "30"
																}
															},
															{
																name : 'budgetProject',
																index : 'content.budgetProject',
																width : 80,
																editable : true,
																edittype : "checkbox",
																editoptions : {
																	value : "Yes:No"
																},
																unformat : aceSwitch
															},
															{
																name : 'expenditureStructure',
																index : 'expenditureStructure',
																width : 80,
																editable : true,
																edittype : "text"
//																
															},
															
															{
																name : 'moneySums',
																index : 'moneySums',
																width : 80,
																sortable : false,
																editable : true,
																editoptions:{									
																	dataEvents: [{type:'focus',fn:function(e){
																	//TODO 下拉后增加后，选择数据字典项目 
																	//debugger;
																		$('#dataItemSpan11').html('');
																		var $attrTypeSel = $( e.target );
																		var attrType = $attrTypeSel.val();
																		$attrTypeSel.before('<span id="dataItemSpan11"><select id="rule" style="width:168.38px;" class="FormElement" role="select"><optgroup label="A"> <option value="ttt">tt</option><option value="ttt">tt</option></optgroup><optgroup label="B"><option value="ttt">tt</option><option value="ttt">tt</option><option value="ttt">tt</option></optgroup"></select></span>');
																		$attrTypeSel.remove();
																}}]
															},
//															formoptions:{colpos:3,rowpos:1,elmsuffix:'<font color="red" >*</font>'},
															},
															
															{
																name : 'caption',
																index : 'caption',
																width : 120,
																sortable : false,
																editable : true,
																edittype : "textarea",
																editoptions : {
																	rows : "2",
//																	cols : "10"
																}
															} ],
						           rowNum:10,
						           sortname: 'id',
									loadComplete : function() {
										var table = this;
										setTimeout(function() {
											styleCheckbox(table);

											updateActionIcons(table);
											updatePagerIcons(table);
											enableTooltips(table);
										}, 0);
									},

						          sortorder: "asc",
						          pager: pager_id,
						          autowidth : true
						      });
						      jQuery("#"+subgrid_table_id).jqGrid('navGrid',"#"+pager_id,{edit:true,add : true,
									addicon : 'icon-plus-sign purple',search : false,del:false})
						    }
						

					});
	 $(grid_selector).closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });

	 

	function aceSwitch(cellvalue, options, cell) {
		setTimeout(function() {
			$(cell).find('input[type=checkbox]').wrap(
					'<label class="inline" />').addClass(
					'ace ace-switch ace-switch-5').after(
					'<span class="lbl"></span>');
		}, 0);
	}
	


	jQuery(grid_selector).jqGrid(
			'navGrid',
			pager_selector,
			{ 
				edit : true,
				editicon : 'icon-pencil blue',
				add : true,
				addicon : 'icon-plus-sign purple',
				del : true,
				delicon : 'icon-trash red',
				search : true,
				searchicon : 'icon-search orange',
				refresh : true,
				refreshicon : 'icon-refresh green',
				view : true,
				viewicon : 'icon-zoom-in grey',
			},
			{
				// edit record form
				// closeAfterEdit: true,
				recreateForm : true,
			
			},
			{
				// new record form
				closeAfterAdd : true,
				recreateForm : true,
				viewPagerButtons : false,
				beforeShowForm : function(e) {
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
							.wrapInner('<div class="widget-header" />')
					style_edit_form(form);
				},
				beforeSubmit : function(postdata, formid) {
					if ($('#rule').length != 0) {
						postdata["rule"] = $('#rule').val();//Reset data of the rule.
					}
					return[true,"sucessful"];
				}


			
			},
			{
				// delete record form
				recreateForm : true,
				beforeShowForm : function(e) {
					var form = $(e[0]);
					if (form.data('styled'))
						return false;

					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
							.wrapInner('<div class="widget-header" />')
					style_delete_form(form);

					form.data('styled', true);
				},
				onClick : function(e) {
					alert(1);
				}
			},
			{
				// search form
				recreateForm : true,
				afterShowSearch : function(e) {
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-title')
							.wrap('<div class="widget-header" />')
					style_search_form(form);
				},
				afterRedraw : function() {
					style_search_filters($(this));
				},
				multipleSearch : true,
			/**
			 * multipleGroup:true, showQuery: true
			 */
			},
			{
				// view record form
				recreateForm : true,
				beforeShowForm : function(e) {
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-title')
							.wrap('<div class="widget-header" />')
				}
			})
			
			
			jQuery(grid_selector).navButtonAdd(pager_selector, {  
	               caption: "审核",  
	               title:"审核",  
	               buttonicon: "ace-icon fa fa-globe blue",  
	               onClickButton: function () {  
	                   var s;  
	                  //多选获取  
	                   s = jQuery(grid_selector).jqGrid('getGridParam', 'selarrrow');  
	                   check;
	               },  
	               position: "last"  
	           })  

	function style_edit_form(form) {
		

		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();// ui-icon,
		// s-icon
		buttons.eq(0).addClass('btn-primary')
				.prepend('<i class="icon-ok"></i>');
		buttons.eq(1).prepend('<i class="icon-remove"></i>')

		buttons = form.next().find('.navButton a');
		buttons.find('.ui-icon').remove();
//		buttons.eq(0).append('<i class="icon-chevron-left"></i>');
//		buttons.eq(1).append('<i class="icon-chevron-right"></i>');
	}

	function style_delete_form(form) {
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();// ui-icon,
		// s-icon
		buttons.eq(0).addClass('btn-danger').prepend(
				'<i class="icon-trash"></i>');
		buttons.eq(1).prepend('<i class="icon-remove"></i>')
	}

	function style_search_filters(form) {
		form.find('.delete-rule').val('X');
		form.find('.add-rule').addClass('btn btn-xs btn-primary');
		form.find('.add-group').addClass('btn btn-xs btn-success');
		form.find('.delete-group').addClass('btn btn-xs btn-danger');
	}
	function style_search_form(form) {
		var dialog = form.closest('.ui-jqdialog');
		var buttons = dialog.find('.EditTable')
		buttons.find('.EditButton a[id*="_reset"]').addClass(
				'btn btn-sm btn-info').find('.ui-icon').attr('class',
				'icon-retweet');
		buttons.find('.EditButton a[id*="_query"]').addClass(
				'btn btn-sm btn-inverse').find('.ui-icon').attr('class',
				'icon-comment-alt');
		buttons.find('.EditButton a[id*="_search"]').addClass(
				'btn btn-sm btn-purple').find('.ui-icon').attr('class',
				'icon-search');
	}

	function beforeDeleteCallback(e) {
		var form = $(e[0]);
		if (form.data('styled'))
			return false;

		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner(
				'<div class="widget-header" />')
		style_delete_form(form);

		form.data('styled', true);
	}

	function beforeEditCallback(e) {
		var form = $(e[0]);
		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner(
				'<div class="widget-header" />')
		style_edit_form(form);
	}

	
	function styleCheckbox(table) {
		/**
		 * $(table).find('input:checkbox').addClass('ace') .wrap('<label />')
		 * .after('<span class="lbl align-top" />')
		 * 
		 * 
		 * $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
		 * .find('input.cbox[type=checkbox]').addClass('ace') .wrap('<label
		 * />').after('<span class="lbl align-top" />');
		 */
	}

	// unlike navButtons icons, action icons in rows seem to be hard-coded
	// you can change them like this in here if you want
	function updateActionIcons(table) {
		/**
		 * var replacement = { 'ui-icon-pencil' : 'icon-pencil blue',
		 * 'ui-icon-trash' : 'icon-trash red', 'ui-icon-disk' : 'icon-ok green',
		 * 'ui-icon-cancel' : 'icon-remove red' }; $(table).find('.ui-pg-div
		 * span.ui-icon').each(function(){ var icon = $(this); var $class =
		 * $.trim(icon.attr('class').replace('ui-icon', '')); if($class in
		 * replacement) icon.attr('class', 'ui-icon '+replacement[$class]); })
		 */
	}

	// replace icons with FontAwesome icons like above
	function updatePagerIcons(table) {
		var replacement = {
			'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
			'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
			'ui-icon-seek-next' : 'icon-angle-right bigger-140',
			'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon')
				.each(
						function() {
							var icon = $(this);
							var $class = $.trim(icon.attr('class').replace(
									'ui-icon', ''));

							if ($class in replacement)
								icon.attr('class', 'ui-icon '
										+ replacement[$class]);
						})
	}

	function enableTooltips(table) {
		$('.navtable .ui-pg-button').tooltip({
			container : 'body'
		});
		$(table).find('.ui-pg-div').tooltip({
			container : 'body'
		});
	}
	


	// var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
	


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

					//$.each(jsonobj, function(i){

					//str+="personType:"+jsonobj[i].personType+";"

					//$("<option value='" + jsonobj[i].personType + "'>" + jsonobj[i].personType+ "</option>").appendTo(typeselect);

					//});

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
	
	
//	$('#tree1').ace_tree({
//		dataSource: treeDataSource ,
//		multiSelect:true,
//		loadingHTML:'<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
//		'open-icon' : 'icon-minus',
//		'close-icon' : 'icon-plus',
//		'selectable' : true,
//		'selected-icon' : 'icon-ok',
//		'unselected-icon' : 'icon-remove'
//	});
//	
});


