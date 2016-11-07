jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector).jqGrid({
		// direction: "rtl",

		url : "/user/view",
		datatype : "json",
		height : 400,
		colNames : [ ' ', '用户标识', '登录用户名', '单位名称','归口科室','密码', '角色类型'],
		colModel : [ {
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
			// editformbutton:true, editOptions:{recreateForm: true,
			// beforeShowForm:beforeEditCallback}
			}
		}, {
			name : 'id',
			index : 'id',
			width : 60,
			sorttype : "int",
			editable : false
		}, {
			name : 'username',
			index : 'username',
			width : 80,
			editable : true,
			editoptions : {
				required:true,
				size : "20",
				maxlength : "30"
			}
			},{
				name : 'realname',
				index : 'realname',
				width : 80,
				editable : true,
				editoptions : {
					required:true,
					size : "20",
					maxlength : "30"
				}
			},{
			name : 'organizationId',
			index : 'organizationId',
			width : 90,
			editable : true,
			sorttype : "date",
			edittype:"select",
			editoptions:{value:"国库支付:国库支付;预算股:预算股;乡财局:乡财局"}
		}, {
			name : 'password1',
			index : 'password1',
			width : 90,
			editable : true,
			hidden:true,
			editrules: { edithidden: true },
			align:"center",
		}, {
			name : 'roleIds',
			index : 'roleIds',
			width : 250,
			editable : true,
			edittype:"select",
			editoptions:{value:"4:  普通用户;1:  超级管理员;2:  预算股;3:国库支付中心"}
//			editoptions : {
//				size : "20",
//				maxlength : "30"
//			}
		} 
		],

		viewrecords : true,
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : pager_selector,
		altRows : true,
		loadonce:true,
		// toppager: true,

		multiselect : true,
		// multikey: "ctrlKey",
		multiboxonly : true,

		loadComplete : function() {
			var table = this;
			setTimeout(function() {
				styleCheckbox(table);

				updateActionIcons(table);
				updatePagerIcons(table);
				enableTooltips(table);
			}, 0);
		},

		editurl : "/user/update",// nothing is saved
		caption : "用户管理",

		autoScroll : true,
		autowidth : true

	});

	// enable search/filter toolbar
	// jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})

	// switch element when editing inline
//	function aceSwitch(cellvalue, options, cell) {
//		setTimeout(function() {
//			$(cell).find('input[type=checkbox]').wrap(
//					'<label class="inline" />').addClass(
//					'ace ace-switch ace-switch-5').after(
//					'<span class="lbl"></span>');
//		}, 0);
//	}
	

	//增加用户
//	$("#adduser").click(function() {
//		jQuery(grid_selector).jqGrid('editGridRow', "new", {
//			height : 300,
//			reloadAfterSubmit : false
//		});
//	});
	
	//修改用户
//	$("#edituser").click(function() { 
//			var gr = jQuery(grid_selector).jqGrid('getGridParam', 'selrow');
//			if (gr != null) 
//				jQuery(grid_selector).jqGrid('editGridRow', gr, 
//						{ height : 300, reloadAfterSubmit : false});
//			else 
//				alert("Please Select Row"); 
//
//			
//			
////			var id = idsArray[0];
//	        var layerWidth=$(window).width()*0.8 > 600?600:$(window).width()*0.8;
//	        var layerHeigth=$(window).height()*0.8 > 550?550:$(window).height()*0.8;
//	        layer.open({
//	            type: 2,
////	            content: '<%=request.getContextPath()%>/login/user/getOrgUserInfoById.do?id='+id,
//	            area: [layerWidth+'px', layerHeigth+'px'],
//	            title:'修改用户',
//	            btn:["提  交","取 消"],
//	            yes:function(index, layero){
//	                layer.confirm('确定要保存修改好用户吗?', {icon: 3, title:'提示'}, function(index){
//	                    var iframeWin = window[layero.find('iframe')[0]['name']];
//	                    if(iframeWin.validatebox()){
//	                        iframeWin.submitUserInfo();
//	                    }
//	                });
//	            },
//	            closeBtn: 2
//	        });
//			
//			
//			});
	// navButtons
	jQuery(grid_selector).jqGrid(
			'navGrid',
			pager_selector,
			{ // navbar options
				edit : true,
				editicon : 'icon-pencil blue',
		        edittitle:'编辑',
				add : true,
				addicon : 'icon-plus-sign purple',
				addtitle:"新增",
				del : true,
				delicon : 'icon-trash red',
				search : true,
				deltitle:'删除',
				searchicon : 'icon-search orange',
				searchtitle:'查看',
				refresh : true,
				refreshicon : 'icon-refresh green',
				refreshtitle:'刷新',
				view : true,
				viewicon : 'icon-zoom-in grey',
				viewtitle:"查看详细"
			},
			{
				// edit record form
				// closeAfterEdit: true,
				recreateForm : true,
				beforeShowForm : function(e) {
					var form = $(e[0]);
					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
							.wrapInner('<div class="widget-header" />')
					style_edit_form(form);
				}
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

	function style_edit_form(form) {
		// enable datepicker on "sdate" field and switches for "stock" field
		
		// update buttons classes
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();// ui-icon,
																			// s-icon
		buttons.eq(0).addClass('btn-primary')
				.prepend('<i class="icon-ok"></i>');
		buttons.eq(1).prepend('<i class="icon-remove"></i>')

		buttons = form.next().find('.navButton a');
		buttons.find('.ui-icon').remove();
		buttons.eq(0).append('<i class="icon-chevron-left"></i>');
		buttons.eq(1).append('<i class="icon-chevron-right"></i>');
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

	// it causes some flicker when reloading or navigating grid
	// it may be possible to have some custom formatter to do this as the grid
	// is being created to prevent this
	// or go back to default browser checkbox styles for the grid
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

});