//<![CDATA[

	     var mydata = [
                { id:"1", name:"Cash",   num:"100", debit:"400.00",credit:"250.00", balance:"150.00", enbl:"1",
                  level:"0", parent:"",  isLeaf:false, expanded:false },
                { id:"2", name:"Cash 1", num:"1",   debit:"300.00",credit:"200.00", balance:"100.00", enbl:"0",
                  level:"1", parent:"1", isLeaf:false, expanded:false },
                { id:"3", name:"Sub Cash 1", num:"1",debit:"300.00",credit:"200.00", balance:"100.00", enbl:"1",
                  level:"2", parent:"2", isLeaf:true,  expanded:false },
                { id:"4", name:"Cash 2", num:"2",debit:"100.00",credit:"50.00", balance:"50.00", enbl:"0",
                  level:"1", parent:"1", isLeaf:true,  expanded:false },
                { id:"5", name:"Bank\'s", num:"200",debit:"1500.00",credit:"1000.00", balance:"500.00", enbl:"1",
                  level:"0", parent:"",  isLeaf:false, expanded:true },
                { id:"6", name:"Bank 1", num:"1",debit:"500.00",credit:"0.00", balance:"500.00", enbl:"0",
                  level:"1", parent:"5", isLeaf:true,  expanded:false },
                { id:"7", name:"Bank 2", num:"2",debit:"1000.00",credit:"1000.00", balance:"0.00", enbl:"1",
                  level:"1", parent:"5", isLeaf:true,  expanded:false },
                { id:"8", name:"Fixed asset", num:"300",debit:"0.00",credit:"1000.00", balance:"-1000.00", enbl:"0",
                  level:"0", parent:"",  isLeaf:true,  expanded:false }
                ];

	     jQuery(function($){
              
	    	 var grid_selector = "#treegrid";
				var pager_selector = "#ptreegrid";
				
				
				//resize to fit page size
				$(window).on('resize.jqGrid', function () {
					$(grid_selector).jqGrid( 'setGridWidth', $(".page-content").width() );
			    })
				//resize on sidebar collapse/expand
				var parent_column = $(grid_selector).closest('[class*="col-"]');
				$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
					if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
						//setTimeout is for webkit only to give time for DOM changes and then redraw!!!
						setTimeout(function() {
							$(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
						}, 0);
					}
			    })
				
				
				
                
            grid = $("#treegrid");

				$("#treegrid").jqGrid({
//                datatype: "local",
//                data: mydata, // will not used at the loading,
//                              // but during expanding/collapsing the nodes
					
				url:'iPaymentList', 
				datatype: "json",
                colNames:[" ","指标序号","预算单位","归口科处室","资金性质","指标来源","功能分类"," "],
                colModel:[
					{name:'enbl', index:'enbl', width: 60, align:'center',fixed:true, sortable:'false',search:'false',
					    formatter:'checkbox', editoptions:{value:'1:0'},
					    formatoptions:{disabled:false}},
                    {name:'id', index:'id', width:1, hidden:true, key:true},
                    {name:'paymentEmployer', index:'paymentEmployer', width:80 },
                    {name:'paymentDepartment', index:'paymentDepartment', width:80, align:"center"},
                    {name:'moneyUseless', index:'moneyUseless', width:80, align:"center"},
                    {name:'originIndex', index:'originIndex', width:80,align:"center"},
                    {name:'functionalClass', index:'functionalClass', width:80,align:"center"},
                    
					{name:'myac',index:'', width:80, fixed:true, sortable:false, resize:false,
						formatter:'actions', 
						formatoptions:{ 
							keys:true,
							//delbutton: false,//disable delete button
							
							delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback},
							//editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
						}
					}
                ],
                
                
                treeIcons:{
                	plus:'ace-icon fa fa-plus center bigger-110 blue',
                	minus:'ace-icon fa fa-minus center bigger-110 blue',
                	leaf:'ace-icon fa fa-chevron-right center orange'
                },
                
//                loadComplete : function() {
//					var table = this;
//					setTimeout(function(){
//						styleCheckbox(table);
//						
//						updateActionIcons(table);
//						updatePagerIcons(table);
//						enableTooltips(table);
//					}, 0);
//				},
                
//                treeReader : {
//                    level_field: "level",
//                    parent_id_field: "parent",
//                    leaf_field: "isLeaf",
//                    expanded_field: "expanded"
//                },
                
                height:'100%',
                sortname: 'id',
                treeGrid: true,
                treeGridModel: 'adjacency', // nested   adjacency
                ExpandColumn: 'paymentEmployer',
                caption: "Demonstrate how to use Tree Grid for the Adjacency Set Model",
				rowNum:10,
				rowList:[10,20,30],
				pager : pager_selector,
				altRows: true
                	
            });
            
            $(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
            // we have to use addJSONData to load the data
            $("#treegrid")[0].addJSONData({
                total: 1,
                page: 1,
                records: mydata.length,
                rows: mydata
            });
            
//        	//switch element when editing inline
//			function aceSwitch( cellvalue, options, cell ) {
//				setTimeout(function(){
//					$(cell) .find('input[type=checkbox]')
//						.addClass('ace ace-switch ace-switch-5')
//						.after('<span class="lbl"></span>');
//				}, 0);
//			}
			//enable datepicker
			function pickDate( cellvalue, options, cell ) {
				setTimeout(function(){
					$(cell) .find('input[type=text]')
							.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
				}, 0);
			}
            
            
          //navButtons
			jQuery(grid_selector).jqGrid('navGrid',pager_selector,
				{ 	//navbar options
					edit: true,
					editicon : 'ace-icon fa fa-pencil blue',
					add: true,
					addicon : 'ace-icon fa fa-plus-circle purple',
					del: true,
					delicon : 'ace-icon fa fa-trash-o red',
					search: true,
					searchicon : 'ace-icon fa fa-search orange',
					refresh: true,
					refreshicon : 'ace-icon fa fa-refresh green',
					view: true,
					viewicon : 'ace-icon fa fa-search-plus grey',
				},
				{
					//edit record form
					//closeAfterEdit: true,
					//width: 700,
					recreateForm: true,
					beforeShowForm : function(e) {
						var form = $(e[0]);
						form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
						style_edit_form(form);
					}
				},
				{
					//new record form
					//width: 700,
					closeAfterAdd: true,
					recreateForm: true,
					viewPagerButtons: false,
					beforeShowForm : function(e) {
						var form = $(e[0]);
						form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
						.wrapInner('<div class="widget-header" />')
						style_edit_form(form);
					}
				},
				{
					//delete record form
					recreateForm: true,
					beforeShowForm : function(e) {
						var form = $(e[0]);
						if(form.data('styled')) return false;
						
						form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
						style_delete_form(form);
						
						form.data('styled', true);
					},
					onClick : function(e) {
						//alert(1);
					}
				},
				{
					//search form
					recreateForm: true,
					afterShowSearch: function(e){
						var form = $(e[0]);
						form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
						style_search_form(form);
					},
					afterRedraw: function(){
						style_search_filters($(this));
					}
					,
					multipleSearch: true,
					/**
					multipleGroup:true,
					showQuery: true
					*/
				},
				{
					//view record form
					recreateForm: true,
					beforeShowForm: function(e){
						var form = $(e[0]);
						form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
					}
				}
			)
		
		
			
			function style_edit_form(form) {
				//enable datepicker on "sdate" field and switches for "stock" field
				form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
				
				form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
						   //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
						  //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
		
						
				//update buttons classes
				var buttons = form.next().find('.EditButton .fm-button');
				buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
				buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
				buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
				
				buttons = form.next().find('.navButton a');
				buttons.find('.ui-icon').hide();
				buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
				buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');		
			}
		
			function style_delete_form(form) {
				var buttons = form.next().find('.EditButton .fm-button');
				buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
				buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
				buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
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
				buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
				buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
				buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
			}
			
			function beforeDeleteCallback(e) {
				var form = $(e[0]);
				if(form.data('styled')) return false;
				
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_delete_form(form);
				
				form.data('styled', true);
			}
			
			function beforeEditCallback(e) {
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_edit_form(form);
			}
            
        });
    //]]>