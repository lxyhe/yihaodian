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
var imgs=[
    {"i":0,"src":"images/banner_01.jpg"},
    {"i":1,"src":"images/banner_02.jpg"},
    {"i":2,"src":"images/banner_03.jpg"},
    {"i":3,"src":"images/banner_04.jpg"},
    {"i":4,"src":"images/banner_05.jpg"},
    {"i":4,"src":"images/banner_06.jpg"}
];
var img_change = {
        interval: 20,
        timer: null,
        WAIT: 3000,
        step: 5,
        curSub: 0,
        moved: 0,
        canAuto: true,
        idxli: [],
        imgli: [],
        init: function () {
            this.updataView();
            this.imgli = $(".img_box li");
            this.idxli = $(".num_box li");
            var me = this;
            $("#banner_change").bind("mouseover", function () {
                me.canAuto = false;
            });
            $("#banner_change").bind("mouseout", function () {
                me.canAuto = true;
            });
            $(".num_box").bind("mouseover", function (e) {
                var target = e.target;
                if (target.nodeName != "UI") {
                    if (target.nodeName == "A") {
                        me.curSub = parseInt(target.innerHTML) - 1;
                        me.changeImg(me.curSub);
                    }
                }
            });
            $(".forward").bind("click", function (e) {
                e.preventDefault();
                me.curSub--;
                me.curSub < 0 && (me.curSub = imgs.length - 1);
                me.changeImg(me.curSub);
            });
            $(".backward").bind("click", function (e) {
                e.preventDefault();
                me.curSub++;
                me.curSub >= imgs.length && (me.curSub = 0);
                me.changeImg(me.curSub);
            })
            this.auto();
        },
        updataView: function () {
            $(".img_box").innerHTML = "";
            $(".num_box").innerHTML = "";
            for (var i = 0, fragimg = "", fragidx = ""; i < imgs.length; i++) {
                fragimg += "<li" + "><a" + "><img" + " src='" + imgs[i].src + "'/></" + "a></" + "li>";
                fragidx += "<li" + "><a" + ">" + (i + 1) + "</a" + "></li" + ">";
            }
            $(".img_box").innerHTML = fragimg;
            $(".num_box").innerHTML = fragidx;
            $('.img_box li')[this.curSub].className = 'active';
            $('.num_box li')[this.curSub].className = 'active';
        },
        auto: function () {
            this.timer = setTimeout(function () {
                this.canAuto ? this.move(1) : this.auto();
            }.bind(this), this.WAIT);
        },
        move: function (x) {
            var n = this.curSub + x;
            var m = (x == 1) ? n == imgs.length ? 0 : n : n < 0 ? imgs.length - 1 : n;
            this.changeImg(m);
        },
        changeImg: function (idx) {
            clearInterval(this.timer);
            this.timer = null;
            var curImg = $(".img_box .active");
            this.fadeO(curImg);
            for (var j = 0; j < imgs.length; j++) {
                $(".img_box>li")[j].className = j == idx ? "active" : "";
                $(".num_box>li")[j].className = j == idx ? "active" : "";
            }
            this.curSub = idx;
            this.fadeI(this.imgli[idx]);
        },
        fadeI: function (elem) {
            var le = 0;
            this.timer = setInterval(function () {
                le += this.step;
                if (le <= 100) {
                    this.setOpacity(elem, le);
                } else {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.auto();
                }
            }.bind(this), this.interval)
        },
        fadeO: function (elem) {
            var le = 100;
            this.timer = setInterval(function () {
                le -= this.step;
                if (le >= 0) {
                    this.setOpacity(elem, le);
                }
            }.bind(this), this.interval)
        },
        setOpacity: function (elem, level) {
            $(elem).css("opacity", level / 100);
        }
    }
img_change.init();