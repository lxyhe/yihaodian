function getElemTop(elem){
    var sum=0;
    while(elem.offsetParent!==null){
        sum+=elem.offsetTop;
        elem=elem.offsetParent;
    }
    return sum;
}
var elevator={
    FHEIGHT:0,//楼层高度
    UPLEVEL:0,//亮灯范围上限
    DOWNLEVEL:0,//亮灯范围下限
    DISTANCE:0,//总距离
    elemTops:[],//所有楼层距文档显示区顶部的距离
    DURATION:1000,//总时间
    STEPS:200,//步数
    interval:0,//
    step:0,
    timer:null,
    divs:[],
    moved:0,
    init:function(){
        this.FHEIGHT=parseFloat($("#f1").css("height"))+parseFloat($("#f1").css("marginBottom"));
        this.UPLEVEL=(innerHeight-this.FHEIGHT)/2;
        this.DOWNLEVEL=this.UPLEVEL+this.FHEIGHT;
        this.divs=$(".pro_nav p");
        for(var i=0;i<this.divs.length;i++){
            this.elemTops[i]=getElemTop(this.divs[i]);
        }
        document.bind("scroll",this.checkLight.bind(this));
        $("#elevator").bind("mouseover",
            function(e){
                var target=e.target;
                if(target.nodeName!="LI"){
                    if (target.nodeName=="A"){
                        target=target.parentElement;
                    }
                    var as=target.$("a");
                    as[0].css("display","none");
                    as[1].css("display","block");
                    target.css("padding","0");
                }
            });
        $("#elevator").bind("mouseout", function(e){
            var target=e.target;
            if(target.nodeName!="LI"){
                if (target.nodeName=="A"){
                    target=target.parentElement;
                }
                //如果对应的span不是hover时
                var i=parseInt(target.$("a:first-child").innerHTML)-1;
                if (this.divs[i].className!="hover"){
                    var as=target.$("a");
                    as[0].css("display","block");
                    as[1].css("display","none");
                    target.css("padding","10px");
                }
            }
        }.bind(this));
        this.interval=this.DURATION/this.STEPS;
        $("#elevator").bind("click",this.move.bind(this));
    },
    checkLight:function(){
        var scrollTop=document.body.scrollTop;
        var blo=this.elemTops[0]-scrollTop;
        var non=this.elemTops[this.elemTops.length-1]-scrollTop;
        var lis=$(".elevator li");
        for(var i=0;i<this.divs.length;i++){
            var elemTop=this.elemTops[i];
            var as=lis[i].$("a");
            if((elemTop<=scrollTop+this.DOWNLEVEL)&&(elemTop>scrollTop+this.UPLEVEL)){             this.divs[i].className="hover";
                as[0].css("display","none");
                as[1].css("display","block");
                lis[i].css("padding","0");
            }else{
                this.divs[i].className="lf";
                as[0].css("display","block");
                as[1].css("display","none");
                lis[i].css("padding","10px");
            }
        }
        this.setShow();
    },
    setShow:function(){
       for(var i=0;i<this.divs.length;i++){
           if(this.divs[i].className=="hover"){
               $("#elevator").css("display","block");
               return ;
           }
       }
        $(".elevator").css("display","none");
    },
    move:function(e){
        if (this.timer==null){
            var target=e.target;
            if (target.className=="etitle"){
                var i=parseFloat(target.previousElementSibling.innerHTML)-1;
                var startTop=document.body.scrollTop;
                var endTop=this.elemTops[i]-this.UPLEVEL;
                this.DISTANCE=endTop-startTop;
                this.step=this.DISTANCE/this.STEPS;
                this.timer=setInterval(this.moveStep.bind(this),this.interval);
            }
        }
    },
    moveStep:function(){
        var scrollTop=document.body.scrollTop;
        window.scrollTo(0,scrollTop+this.step);
        this.moved++;
        if (this.moved==this.STEPS){
            clearInterval(this.timer);
            this.timer=null;
            this.moved=0;
        }
    }
}
elevator.init();

