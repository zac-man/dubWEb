/**
 * Created by manjh on 2017/7/30.
 */


$(document).ready(function () {
    //$("#tabsList").append();
    getCheckList();
    function getCheckList() {
        $.ajax({
            url: '/api/findCheckedList',
            type: 'GET',
            success: function (res) {
                var tabLists = res.data[0].list.split(",");
                drawTabs(tabLists);
                initListen();
            },
            error: function () {
                $.alert("与服务器通信发生错误");
            }
        });
    }

    /***
     *
     *
     li ng-class="{true: 'active', false: ' '}[$index == 0]" ng-repeat="tab in tabList">
     <a href="#dubList_{{$index}}" data-toggle='tab' aria-expanded='false'>{{tab}}</a>
     </li>
     * @param items
     */
    function drawTabs(items) {
        $.each(items, function (i, item) {
            $("#tabsList").append(drawTab(i, item));
            $("#tab-content").append(drawTabBody(i, item));
        })
    }

    function drawTab(i, tab) {
        var str = "";
        if (i == 0) {
            str = "<li class='tabLists active' data-set='" + tab + "'>";
        } else {
            str = "<li class='tabLists' data-set='" + tab + "'>";
        }
        str += "<a href='#dubList_" + i + "' aria-controls='dubList_" + i + "' data-toggle='tab' aria-expanded='false'>" + tab + "</a>";
        str += "</li>";
        return str;
    }



    function drawTabBody(i, tab) {
        var str = "";
        if (i == 0) {
            str = "<div class='tab-pane active fade in' data-set='" + tab + "' data-class='#dubList_" + i + "' id='#dubList_" + i + "'>";
        } else {
            str = "<div class='tab-pane  fade in' data-set='" + tab + "' data-class='#dubList_" + i + "' id='#dubList_" + i + "'>";
        }
        str += drawDubListBody(tab);
        str += "</div>";
        return str;
    }

    function drawDubListBody(type) {
        $.ajax({
            url: '/api/findDubByType',
            type: 'POST',
            data:{
                type:type
            },
            success: function (res) {
               console.log(res);
            },
            error: function () {
                $.alert("与服务器通信发生错误");
            }
        });

        return type;
    }

    function initListen() {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var nowHref = $(this).attr("href");
            $("#tab-content").find(".active").removeClass("active");
            $("#tab-content").find('[data-class=' + nowHref + ']').addClass("active");
        })
    }

});