/**
 * Created by manjh on 2017/7/30.
 */


$(document).ready(function () {
    var table = $('#dubListTable').DataTable({

        "sDom": "<'dt-toolbar'<'col-sm-6'l><'col-sm-6 hidden-xs'>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        "ajax": {
            "url": "/api/dubAll"
        },
        "bDestroy": true,
        "iDisplayLength": 25,
        "oLanguage": {
            "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
        },
        "searching": true,
        "bLengthChange": false,
        "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "所有"]],
        "columns": [
            {"data": null},
            {"data": "name"},
            {"data": "type"},
            {"data": null},
            {"data": null},
        ],
        columnDefs: [
            {
                "searchable": false,
                "orderable": false,
                "targets": 0,
                render: function (data, type, row, meta) {

                    return "1";
                }
            },
            {
                "searchable": false,
                "orderable": false,
                targets: 3,
                render: function (data, type, row, meta) {
                    /*return '<audio class="audioEle" src="/upload/' + data.url + '" preload="auto" controls loop>'
                        + window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '') +
                        '/upload/' + data.url + '' +
                        '</audio>';*/
                    return  '<audio class="audioEle" src="/upload/'+data.url+'" preload="auto" controls loop></audio>';
                }
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {

                    var btnStr = '<div class="btn-group">';
                    btnStr += '<a href="/upload/' + data.url + '" download="" class="btn btn-xs btn-warning downloadBtn">下载</a>';
                    btnStr += '</div>';
                    return btnStr
                }
            },
            {"orderable": false, "targets": 4}
        ],
        "order": [[1, 'asc']],
        "fnPreDrawCallback": function (oSettings) {
        },
        "initComplete": function (settings, json) {
            $(".audioEle").audioPlayer();
        }
    });
    table.on('order.dt search.dt',
        function () {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

    $("#dubType").change(function () {
        table
            .column(2)
            .search($(this).val())
            .draw();
    });
    $("#dubName").bind('input propertychange', function () {
        console.log("aaa");
        table
            .column(1)
            .search($(this).val())
            .draw();
    });

    var selectOption = ["专题配音", "宣传片配音", "广告配音",
        "飞碟说配音", "英语配音", "纪录片配音", "游戏配音",
        "模仿配音", "独白配音", "童声配音", "方言配音",
        "角色配音", "粤语配音", "各国语言"];
    $.each(selectOption, function (i, value) {
        var option = '<option value="' + value + '">' + value + '</option>';
        $("#dubType").append(option);
    });

});