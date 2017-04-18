window.$=HTMLElement.prototype.$=function(selector){
        var elems=(this==window?document:this).querySelectorAll(selector);
        return elems.length==0?null:elems.length==1?elems[0]:elems;
}
HTMLElement.prototype.bind=document.bind=function(eName,fn,capture){
        this.addEventListener(eName,fn,capture);
}
HTMLElement.prototype.css=function(prop,value){
        if (value===undefined){
            var style=getComputedStyle(this)
            return style[prop];
        }else{
            this.style[prop]=value;
        }
}
function anim(imgul,idxul,imgs){
    var im=imgul+" li";
    var id=idxul+" li b";
    var images_change={
        imul:imgul,
        idul:idxul,
        interval: 20,
        timer: null,
        WAIT: 3000,
        step: 5,
        curSub: 0,
        moved: 0,
        canAuto: true,
        idxli: [],
        imgli: [],
        igli:im,
        idli:id,
        init:function(){
            this.updataView();
            this.imgli=$(this.igli);
            this.idxli=$(this.idli);
            $(this.imul).parentNode.bind("mouseover",function(){
                this.canAuto=false;
            });
            $(this.idul).parentNode.bind("mouseout",function(){
                this.canAuto=true;
            })
            this.auto();
        },
        updataView:function(){
            $(this.imul).innerHTML="";
            $(this.idul).innerHTML="";
            for(var i= 0,fragimg="",fragidx="";i<3;i++){
                fragimg+="<li"+"><img src='"+imgs[i].src+"'<"+"/li>";
                fragidx+="<li"+"><"+"b><"+"/b><"+"/li>";
            }
            $(this.imul).innerHTML=fragimg;
            $(this.idul).innerHTML=fragidx;
            $(this.igli)[this.curSub].className="active";
            $(this.idli)[this.curSub].className="active";
        },
        auto:function(){
            this.timer=setTimeout(function(){
                this.canAuto?this.move(1):this.auto();

            }.bind(this),this.WAIT);
        },
        move: function (x) {
            var n = this.curSub + x;
            var m = (x == 1) ? n == imgs.length ? 0 : n : n < 0 ? imgs.length - 1 : n;
            this.changeImg(m);
        },
        changeImg: function (idx) {
            clearInterval(this.timer);
            this.timer = null;
            var act=this.imul+" .active";
            var actt=this.idul+" .active";
            var curImg = $(act);
            var curIdx = $(actt)
            this.fadeO(curImg,curIdx);
            for (var j = 0; j < imgs.length; j++) {
                $(this.igli)[j].className = j == idx ? "active" : "";
                $(this.idli)[j].className = j == idx ? "active" : "";
            }
            this.curSub = idx;
            this.fadeI(this.imgli[idx],this.idxli[idx]);
        },
        fadeI: function (elem,elem1) {
            var le = 0;
            var wi = 0;
            this.timer = setInterval(function () {
                le += this.step;
                wi += 2;
                if (le <= 100) {
                    this.setOpacity(elem,elem1,le,wi);
                } else {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.auto();
                }
            }.bind(this), this.interval)
        },
        fadeO: function (elem,elem1) {
            var le = 100;
            var wi=0;
            this.timer = setInterval(function () {
                le -= this.step;
                if (le >= 0) {
                    this.setOpacity(elem,elem1,le,wi);
                }
            }.bind(this), this.interval)
        },
        setOpacity:function (elem,elem1,level,width) {
            $(elem).css("opacity", level / 100);
            $(elem1).css("width",width);
        }
    }
    images_change.init();
}

