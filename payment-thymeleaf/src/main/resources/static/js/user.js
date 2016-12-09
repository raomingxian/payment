jQuery(function($) {

	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";

	jQuery(grid_selector).jqGrid({
		// direction: "rtl",

		url : "/user/view",
		datatype : "json",
		height : 400,
		colNames : [  ' ', '用户标识', '登录用户名', '单位名称','归口科室','密码', '角色类型'],
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
					recreateForm : true
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
			editrules:{
				required:true,
				size : "30",
				minlength : "6",
				maxlength : "30",
				custom:true,
				custom_func:function(value, colname) {
					if (value.length >20||value.length <6)
						return [false,"请输入字符长度6到20位"];
					else{
					var message="服务器连接失败，请重新登录";
					var result=false;
               		$.ajax({
               			type : "post",
               			async : false,
               			url : "/user/chackusername/"+value,
               			success : function(data) {
         				if (data != true) {
         					
         					message="用户名："+$('#username').val()+"，已经存在";
         					
         				}else{
         					message="";
        					result=true;
         				}

         				
         			},error: function () {
         				message="服务器连接失败，请重新登录";
    					
                    }

               		});
               		return [result,message];
					}
				}
			},
			editoptions : {
//				required:true,
//				size : "30",
//				minlength : "6",
//				maxlength : "30",
				searchoptions:{sopt:['eq','ne','lt','le','gt','ge']},
//				custom:true,
//				custom_func:function(value, colname) {
//						if (value="admin123123123")
//						return [false,"Please enter value between 0 and 20"];
//						else
//						return [true,""];
//						}
				
//				dataEvents: [
//				{type:'blur',fn:function(e){
//					
//					if($('#username').val().trim()==""){
//						alert("请输入用户名");
//						$('#username').focus();
//					}
//					
//					
//               		$.ajax({
//               			type : "post",
//               			async : false,
//               			url : "/user/chackusername/"+$('#username').val(),
//               			success : function(data) {
////               				alert("data:"+data);
//         				if (data != true) {
//         					
//         					alert("用户名："+$('#username').val()+"，已经存在");
//             				$('#username').val("");
//             				$('#username').focus();
//         				}
//
//         				
//         			}
//
//               		});
//					
//				}}]
		
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
//			sorttype : "date",
			edittype:"select",
			editoptions:{value:gettypes()},
//			editoptions:{value:"预算股:预算股;国库股:国库股;行政执法股:行政执法股;教科文股:教科文股;经建股:经建股;农业股:农业股;社保股:社保股;乡财局:乡财局;综合股:综合股;信息中心:信息中心;综改办:综改办;非税收入局:非税收入局"}
			
		}, {
			name : 'password1',
			index : 'password1',
			width : 90,
			editable : true,
			hidden:true,
			editrules: { 
				edithidden: true,
				required:true
				},
			align:"center",
		}, {
			name : 'roleIds',
			index : 'roleIds',
			width : 250,
			editable : true,
			edittype:"select",
			editoptions:{value:"4:  股室用户;1:  超级管理员;2:  预算股;3:国库支付中心"}
//			editoptions : {
//				size : "20",
//				maxlength : "30"
//			}
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
		editurl : "/user/update",// nothing is saved
//		caption : "用户管理",

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
		        edittitle:'编辑',
//		        caption: "编辑", 
				add : true,
				addtitle:"新增",
				del : true,
				search : true,
				deltitle:'删除',
				searchtitle:'查看',
				refresh : true,
				refreshtitle:'刷新',
				view : true,
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
				// search form
				recreateForm : true,
				multipleSearch : true,
			/**
			 * multipleGroup:true, showQuery: true
			 */
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
			
	// var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

});