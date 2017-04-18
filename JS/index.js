/**
 * Created by Administrator on 2016/8/26.
 */
$(function(){
    $('#request_header').load('PHP/header.php');
    $('#request_footer').load('PHP/footer.php');
});
$(".fiery_recommend").mouseover(function(){
    var uleft=parseInt($(".fiery_recommend .fiery_fund_1").css("left"));
    if(uleft==0){
        $(this).children("a").removeClass("active").css("display","block");
    }else if(uleft==-1200){
        $(this).children("a").addClass("active").css("display","block");
    }
});
$(".fiery_recommend").mouseout(function(){
    $(this).children("a").removeClass("active").css("display","none");
});
$(".fiery_recommend>a").click(function(e){
    e.preventDefault();
    var html=$(this).html();
    if(html=="&gt;"){
        $(this).addClass("active");
        $(this).html("&lt;");
        move(1);
    }
    else if(html=="&lt;"){
        $(this).removeClass("active");
        $(this).html("&gt;");
        move(0);
    }
})
function move(n){
    clearInterval(timer);
    timer=null;
    var left=parseInt($(".fiery_recommend ul").css("left"));
    var timer=setInterval(function(){
        if(n==1) {left-=50;}
        else{left+=50;}
        $(".fiery_recommend ul").css("left",left+"px");
        if(left>=0){
            $(".fiery_recommend ul").css("left","0px");
            clearInterval(timer);
        }else if(left<=-1200){
            $(".fiery_recommend ul").css("left","-1200px");
            clearInterval(timer);
        }
    },20)
}
$('top_return').click(function(){
    var timer=setInterval()
})
