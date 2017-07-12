/**
 * Created by manjh on 2017/7/9.
 */
$.extend($.fn.dataTable.defaults, {
    language: {
        "sProcessing"    : "处理中...",
        "sLengthMenu"    : "显示 _MENU_ 项结果",
        "sZeroRecords"   : "没有匹配结果",
        "sInfo"          : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty"     : "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered"  : "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix"   : "",
        "sSearch"        : "搜索:",
        "sUrl"           : "",
        "sEmptyTable"    : "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands" : ",",
        "oPaginate"      : {
            "sFirst"   : "<i class='fa fa-angle-double-left'></i>",
            "sLast"    : "<i class='fa fa-angle-double-right'></i>",
            "sNext"    : "<i class='fa fa-angle-right'></i>",
            "sPrevious": "<i class='fa fa-angle-left'></i>"
        },
        "oAria"          : {
            "sSortAscending" : ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    }

});
