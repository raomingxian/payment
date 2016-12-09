jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector).jqGrid({
		// direction: "rtl",

		url : "/business/organization/view",
		datatype : "json",
		height : 400,
		colNames : [  '单位标识',  '单位名称','所属股室'],
		colModel : [
//		            {
//			name : 'myac',
//			index : '',
//			width : 80,
//			fixed : true,
//			sortable : false,
//			resize : false,
//			formatter : 'actions',
//			formatoptions : {
//				keys : true,
//
//				delOptions : {
//					recreateForm : true
//				},
//			// editformbutton:true, editOptions:{recreateForm: true,
//			// beforeShowForm:beforeEditCallback}
//			}
//		},
		{
			name : 'id',
			index : 'id',
			width : 60,
			sorttype : "int",
			editable : false
		},{
				name : 'organizationName',
				index : 'organizationName',
				width : 80,
				editable : true,
				editoptions : {
					required:true,
					size : "60",
					minlength : "6",
					maxlength : "50"
				}
		},{
			name : 'sysDepartment.departmentName',
			index : 'departmentName',
			width : 80,
			editable : true,
//			editoptions : {
//				required:true,
//				size : "60",
//				minlength : "6",
//				maxlength : "50"
//			},
			edittype:"select",
			editoptions:{value:gettypes()},
	}
		],

		viewrecords : true,
		rowNum : 10,
		pager : pager_selector,
		altRows : true,

		multiselect : true,
		multiboxonly : true,
		jsonReader : {
			root : "content",
			page : "currpage",
			total : "totalPages",
			records : "totalElements"
		},

        
        sortname: 'id',
        editurl :"/business/organization/update", 
        sortorder: "asc",
		autoScroll : true,
		autowidth : true,
		

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
		        edittitle:'编辑',
		        edittext: "编辑", 
				add : true,
				addtitle:"新增",
				addtext: "新增", 
				del : true,
				deltitle:'删除',
				deltext:'删除',
				search : false,
				refresh : true,
				refreshtitle:'刷新',
				refreshtext:'刷新',
				view : false,
				viewtitle:"查看详细"
			},
			{
				// edit record form
				// closeAfterEdit: true,
				caption: "编辑", 
				recreateForm : true
			},
			{
				// new record form
				closeAfterAdd : true,
				recreateForm : true,
				viewPagerButtons : false
			},
			{
				// delete record form
				recreateForm : true,
			},
			{
				// view record form
				recreateForm : true
			})

	
	function gettypes() {

		// 动态生成select内容

		var str = "";

		$.ajax({

			type : "post",

			async : false,

			url : "/business/organization/departmentlist",

			success : function(data) {

				if (data != null) {

					var jsonobj = eval(data);

					var length = jsonobj.length;

					for (var i = 0; i < length; i++) {

						if (i != length - 1) {

							str += jsonobj[i].id + ":"
									+ jsonobj[i].departmentName + ";";

						} else {

							str += jsonobj[i].id + ":"
									+ jsonobj[i].departmentName;// 这里是option里面的 value:label

						}

					}

				}

//				alert(str);

			}

		});

		return str;

	}
	
	
	function getorganization(select_value) {

		// 动态生成select内容

		var str = "";
//		var organizationTypeSelected=$("select#organizationType").find ("option:selected").val();
//	   var str1= $("select#organizationType").val()
		
		$.ajax({

			type : "post",

			async : false,

			url : "/business/organization/organizationlist/"+select_value,

			success : function(data) {

				if (data != null) {

					var jsonobj = eval(data);

					var length = jsonobj.length;

					for (var i = 0; i < length; i++) {

//						if (i != length - 1) {
							
							str += '<option value='+jsonobj[i].id +'>'+jsonobj[i].organizationName +'</option>';

//						} else {
//
//							str +=  '<option value='+jsonobj[i].id +'>'+jsonobj[i].organizationType +'</option>';// 这里是option里面的 value:label
//
//						}

					}

				}

//				alert(str);

			}

		});

		return str;

	}
	
	
	
	// var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
	
	

});