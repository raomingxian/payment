/*******************************************
* Description:
* 自定义jqGrid编辑列中的控件
*
* 可格式化的类型：
* 1)PopupDialog     弹出框.可选择数据并返回值到编辑列
* 2)DateTime        日历控件
*
* DateTime调用方法：
* 在编辑列中加属性  formatter: JqGridFormatCell.ToDateTime

* PopupDialog调用方法：
*   1.给编辑列加属性
*     formatter: JqGridFormatCell.ToPopupDialog ,
*     formatoptions: { UserControl: "<%=ucAirline.ClientID %>" }
*
*   2.页面最下方添加以下代码 (将弹框返回值赋给编辑列)
$("#<%=ucAirline.ClientID %>_datapicker").DataPicker("option", "callback", function (text, value) {
JqGridFormatCell.SetValue(text);
});
注：弹出框用户控件(UCAirlinePopupDialog.ascx)需自行引用至页面，并将其隐藏.
*
* Author：
*******************************************/
var JqGridFormatCell = {
    _createdPopupButton: function (rowData, gridID) {
        var row = eval("(" + rowData + ")");
        var btnImgSrc =  "/img/favicon.ico";
        var args = "'" + gridID + "'" + ",'" + row.rowKey + "'" + ",'" + row.colName + "'" + ",'" + row.userControlID + "'";
        var strPopupBtn = '&nbsp;&nbsp;<img style="cursor:pointer" src="' + btnImgSrc + '" onclick="JqGridFormatCell.showPicker(' + args + ')" />';
        $("#" + row.rowKey + "_" + row.colName).css("width", "85%").after(strPopupBtn)
    },

    showPicker: function (gridID, rowKey, colName, userControlID) {
        $("#" + gridID).setSelection(rowKey, true);
        var $textbox = $("#" + rowKey + "_" + colName);
        userControlID = userControlID + "_datapicker";

        $("#" + userControlID).DataPicker("Clear");
        $("#" + userControlID + "txtKeyDP").val($textbox.val());
        $("#" + userControlID + "hlOpenDP").click();

        $("body").data("CurrentCellTextbox", $textbox);
    },

    SetValue: function (value) {
        $("body").data("CurrentCellTextbox").val(value);
    },

    beforEditRow: function (gridID, rowid) {
        //ToPopupDialog
        $("#" + rowid).find(":hidden[name='hiddenPara_ToPopup']").each(function (i) {
            $(this).parent().attr({ name: "hiddenPara_ToPopup", value: this.value });
            $(this).remove();
        });

        //ToDateTime
        $("#" + rowid).find(":hidden[name='hiddenPara_ToDate']").each(function (i) {
            $(this).parent().attr({ name: "hiddenPara_ToDate" });
            $(this).remove();
        });
    },

    afterEditRow: function (gridID, rowid) {
        //ToPopupDialog
        $("#" + rowid).find("td[name='hiddenPara_ToPopup']").each(function (i) {
            JqGridFormatCell._createdPopupButton($(this).attr("value"), gridID);
        });

        //ToDateTime
        $("#" + rowid).find("td[name='hiddenPara_ToDate']").each(function (i) {
            $(this).find(":text").datepicker({ changeMonth: true, changeYear: true, dateFormat: DATE_FORMAT });
        });
    },

    ToPopupDialog: function (cellValue, options) {
        if (!options.colModel.formatoptions.UserControl) {
            $.jError("formatoptions.UserControl is not defined");
            throw Error();
        }
        var rowKey = options.rowId;
        var colName = options.colModel["name"];
        var gridID = options.gid;
        var userControlID = options.colModel.formatoptions.UserControl;

        var strJson = "{rowKey:'" + rowKey + "',colName:'" + colName + "',userControlID:'" + userControlID + "'}";
        var strHtml = '<input type="hidden" name="hiddenPara_ToPopup" value="' + strJson + '" />';

        if (cellValue == undefined) {
            return strHtml;
        }
        return cellValue + strHtml;
    },

    ToDateTime: function (cellValue, options) {
        var strHtml = '<input type="hidden" name="hiddenPara_ToDate" />';

        if (cellValue == undefined) {
            return strHtml;
        }
        return cellValue + strHtml;
    }
};