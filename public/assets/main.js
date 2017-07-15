/**
 * Created by manjh on 2017/7/15.
 */
$(function() {
    $(".btn_top").hide();
    $(".btn_top").on("click",function(){
        $('html, body').animate({scrollTop: 0},300);return false;
    })
    $(window).bind('scroll resize',function(){
        if($(window).scrollTop()<=300){
            $(".btn_top").hide();
        }else{
            $(".btn_top").show();
        }
    })
});
var flag=1;
$('#rightArrow').click(function(){
    if(flag==1){
        $("#floatDivBoxs").animate({right: '-175px'},300);
        $(this).animate({right: '-5px'},300);
        $(this).css('background-position','-50px 0');
        flag=0;
    }else{
        $("#floatDivBoxs").animate({right: '0'},300);
        $(this).animate({right: '170px'},300);
        $(this).css('background-position','0px 0');
        flag=1;
    }
});

