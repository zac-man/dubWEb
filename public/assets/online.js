/**
 * Created by manjh on 2017/7/30.
 */


$(document).ready(function () {

    var selectOption = ['所有样音', "专题配音", "宣传片配音", "广告配音",
        "飞碟说配音", "英语配音", "纪录片配音", "游戏配音",
        "模仿配音", "独白配音", "童声配音", "方言配音",
        "角色配音", "粤语配音", "各国语言"];
    var pageSize = 15, pageNo = 1, type = '', name = '';
    var jPlayer = $("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                mp3: ""
            });
        },
        swfPath: "../../dist/jplayer",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });
    initHtml();
    function initHtml() {
        initDubType();
        getDubList(pageSize, pageNo, type, name);
    }

    function initDubType() {
        var dubTypeListStr = '';
        $.each(selectOption, function (i, value) {
            var temp = '';
            if (value == '所有样音') {
                temp = '<a href="javascript:;" class="list-group-item list-group-item-warning dubTypeBtn" data-set="">' + value + '</a>';
            } else {
                temp = '<a href="javascript:;" class="list-group-item list-group-item-primary dubTypeBtn" data-set="' + value + '">' + value + '</a>';
            }
            dubTypeListStr += temp;
        });
        $("#listType").append(dubTypeListStr);
        $(".dubTypeBtn").click(function () {
            type = $(this).attr('data-set');
            $("#dubName").val('');
            $(this).parent().find('.list-group-item-warning').removeClass('list-group-item-warning');
            $(this).addClass('list-group-item-warning');
            getDubList(pageSize, 1, type, '');
        });
    }

    $("#searchBtn").click(function () {
        name = $("#dubName").val();
        getDubList(pageSize, 1, type, name);
    });

    function getDubList(pageSize, pageNo, type, name) {
        $.ajax({
            url: '/api/dubListSearch',
            type: 'POST',
            data: {
                pageSize: pageSize,
                pageNo: pageNo,
                type: type,
                name: name
            },
            success: function (res) {
                //drawTabs(res.data);
                var tBodyStr = draw(res.data);
                $("#tBody").empty();
                $("#tBody").append(tBodyStr);
                var options = {
                    currentPage: pageNo,//当前页
                    totalPages: Math.ceil(parseInt(res.totalCount) / pageSize),//总页数
                    numberofPages: 8,//显示的页数
                    bootstrapMajorVersion: 3,
                    onPageClicked: function (event, originalEvent, pagetype, page) { //异步换页
                        getDubList(pageSize, page, type, name);
                    }
                };
                $("#page").bootstrapPaginator(options);
                $(".listenBtn").click(function () {
                    var temp = {
                        title: $(this).attr("dataName"),
                        mp3: $(this).attr("dataUrl")
                    };
                    jPlayer.jPlayer("setMedia", {
                        title: temp.title,
                        mp3: '/upload/' + temp.mp3
                    }).jPlayer("play");
                });
            },
            error: function () {
                $.alert("与服务器通信发生错误");
            }
        });
    }

    function draw(data) {
        var str = '';
        console.log(data);
        if (data.length === 0) {
            str += '<tr><td colspan="4">未能找到你所需的样音，如您需要请联系客服</td></tr>';
            $("#dumpTotalTableFoot").hide();
            return str;
        }

        for (var i = 0; i < data.length; i++) {
            var temp = "<tr>";
            temp += drawTd(i + 1);
            temp += drawTd(data[i].name);
            temp += drawTd(data[i].type);
            var btnStr = '<div class="btn-group" role="group">';
            btnStr += '<button type="button"  dataUrl="' + data[i].url + '" dataName="' + data[i].name + '" class="btn btn-xs btn-success listenBtn"><i class="glyphicon glyphicon-play"></i>点击试听</button>';
            btnStr += '<a download href="/upload/' + data[i].url + '" class="btn btn-xs btn-warning"><i class="glyphicon glyphicon-download-alt"></i>下载</a>';
            btnStr += '</div>';
            temp += drawTd(btnStr);
            temp += '</tr>';
            str += temp;
        }
        return str;
    }

    function drawTd(str) {
        return "<td>" + str + "</td>";
    }
});