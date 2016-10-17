//<![CDATA[
        $(function(){
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
                ],
                grid = $("#treegrid");

            grid.jqGrid({
                datatype: "local",
                data: mydata, // will not used at the loading,
                              // but during expanding/collapsing the nodes
                colNames:["id","Account","Acc Num","Debit","Credit","Balance","Enabled"],
                colModel:[
                    {name:'id', index:'id', width:1, hidden:true, key:true},
                    {name:'name', index:'name', width:180},
                    {name:'num', index:'acc_num', width:80, align:"center"},
                    {name:'debit', index:'debit', width:80, align:"right"},
                    {name:'credit', index:'credit', width:80,align:"right"},
                    {name:'balance', index:'balance', width:80,align:"right"},
                    {name:'enbl', index:'enbl', width: 60, align:'center',
                     formatter:'checkbox', editoptions:{value:'1:0'},
                     formatoptions:{disabled:false}}
                ],
                height:'100%',
                rowNum: 10000,
                //pager : "#ptreegrid",
                sortname: 'id',
                treeGrid: true,
                treeGridModel: 'adjacency',
                treedatatype: "local",
                ExpandColumn: 'name',
                caption: "Demonstrate how to use Tree Grid for the Adjacency Set Model"
            });
            // we have to use addJSONData to load the data
            grid[0].addJSONData({
                total: 1,
                page: 1,
                records: mydata.length,
                rows: mydata
            });
        });
    //]]>