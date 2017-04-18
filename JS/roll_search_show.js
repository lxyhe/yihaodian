function getElemTops(elem){
    var sum=0;
    while(elem.offsetParent!==null){
        sum+=elem.offsetTop;
        elem=elem.offsetParent;
    }
    return sum;
}
document.onscroll=function(){
    var scrollTop=document.body.scrollTop;
    var div=$("#banner")[0];
    var toBodyHeight=getElemTops(div);
    var elmHeight=parseFloat($("#banner").css("height"));
    $("#roll_search").css("display",(scrollTop>=toBodyHeight+elmHeight?"block":"none"));
}

