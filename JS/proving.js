/**
 * Created by Administrator on 2016/8/17.
 */
function rn(min,max){
    return Math.floor( Math.random()*(max-min)+min );
}

function rc(min,max){
    var r = rn(min,max);
    var g = rn(min,max);
    var b = rn(min,max);
    return "rgb("+r+","+g+","+b+")";
}
var change=document.getElementById("change");
change.onclick = function(e){
    e.preventDefault();
    draw();
}
var c1=document.getElementById("c1");
function draw(){
    var ctx = c1.getContext('2d');
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = rc(180,240);
    ctx.fillRect(0,0,c1.width,c1.height);
    var str = 'ABCEFGHJKLMNPQRSTWXY3456789';
    var arr=[];
    for(var i=0; i<5; i++){
        var txt = str[rn(0,str.length)];
        ctx.fillStyle = rc(50,160);
        ctx.font = rn(15,40)+'px SimHei';
        var x = 15+i*20;
        var y = rn(25,45);
        var deg = rn(-45, 45);
        ctx.translate(x,y);
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(txt, 0,0);
        arr[arr.length]=txt;
        ctx.rotate(-deg*Math.PI/180);
        ctx.translate(-x,-y);
    }
    for(var i=0; i<8; i++){
        ctx.strokeStyle = rc(40,180);
        ctx.beginPath();
        ctx.moveTo( rn(0,c1.width), rn(0,c1.height) );
        ctx.lineTo( rn(0,c1.width), rn(0,c1.height) );
        ctx.stroke();
    }
    for(var i=0; i<100; i++){
        ctx.fillStyle = rc(0,255);
        ctx.beginPath();
        ctx.arc(rn(0,c1.width),rn(0,c1.height), 1, 0, 2*Math.PI);
        ctx.fill();
    }
    return arr;
}