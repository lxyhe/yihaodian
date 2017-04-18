$(function(){
    $('#request_header').load('PHP/header.php');
    $('#request_footer').load('PHP/footer.php');
});
$(".register_column li").click(function(){
    /*    console.log($(this).children().nth(2));*/
    clearInterval(timer);
    timer=null;
    var left=parseFloat($(this).children().first().css("left"));
    var timer=setInterval(function(){
        left-=50;
        if(left<5){
            clearInterval(timer);
            $(this).children().first().css("left","5px");
            $(this).children().first().css("text-align","right");
            $(this).children().first().next().focus();
        }else{$(this).children().first().css("left",left+"px");}
    }.bind(this),50);
});
$(".register_column li input").focus(function(){
    clearInterval(timer);
    timer=null;
    var width=parseFloat($(this).next().css("width"));
    var left=parseFloat($(this).prev().css("left"));
    var timer=setInterval(function(){
        width+=50;
        if(width>250){
            clearInterval(timer);
        }else{$(this).next().css("width",width+"px");}
    }.bind(this),100)
    if(left>=115){
        timer=setInterval(function(){
            left-=50;
            if(left<5){
                clearInterval(timer);
                $(this).prev().css("left","5px");
                $(this).prev().css("text-align","right");
            }else{$(this).prev().css("left",left+"px");}
        }.bind(this),50);
    }
    timer=null;
});
var username=document.getElementById("username");
username.onfocus=function(){
    $(this).next().html("请输入您的账户名称");
    $(this).next().removeClass().addClass("form_prompt");
}
username.onblur=function() {
    var u=username.value;
    if (username.validity.valueMissing) {
        $(this).next().html("用户名不能为空");
        $(this).next().removeClass().addClass("form_prompt_red");
        return;
    } else if ((u.length<3)||(u.length>12)){
        $(this).next().html("请输入3至12位的账户名称");
        $(this).next().removeClass().addClass("form_prompt_red");
        return;
    }
    $.post("PHP/register_proving.php",{uname:u},function(data){
        console.log(data);
        if(data=="true"){
            $(this).next().html("用户名已经存在");
            $(this).next().removeClass().addClass("form_prompt_red");
        }else if(data=="false"){
            $(this).next().html("用户名可用");
            $(this).next().removeClass().addClass("form_prompt_green");
        }
    }.bind(this));
}
var pwd=document.getElementById("password");
pwd.onfocus=function(){
    $(this).next().html("请输入6至12位的数字和字母");
    $(this).next().removeClass().addClass("form_prompt");
}
pwd.onblur=function(){
    if(pwd.validity.valueMissing){
        $(this).next().html("密码不能为空");
        $(this).next().removeClass().addClass("form_prompt_red");
    }else if(pwd.validity.patternMismatch){
        $(this).next().html("请输入6至12位的字母和数字");
        $(this).next().removeClass().addClass("form_prompt_red");
    }else{
        $(this).next().html("密码正确");
        $(this).next().removeClass().addClass("form_prompt_green");
    }
}
var prov_pwd=document.getElementById("prov_pwd");
prov_pwd.onfocus=function(){
    $(this).next().html("请输入再次输入账户密码");
    $(this).next().removeClass().addClass("form_prompt");
}
prov_pwd.onblur=function(){
    if(prov_pwd.validity.valueMissing){
        $(this).next().html("请再次输入账户密码");
        $(this).next().removeClass().addClass("form_prompt_red");
    }else if(prov_pwd.value!==pwd.value){
        $(this).next().html("密码输入不一致，请重新输入");
        $(this).next().removeClass().addClass("form_prompt_red");
    } else{
        $(this).next().html("密码验证正确");
        $(this).next().removeClass().addClass("form_prompt_green");
    }
}
var email=document.getElementById("email");
email.onfocus=function(){
    $(this).next().html("请输入您的电子邮件地址");
    $(this).next().removeClass().addClass("form_prompt");
}
email.onblur=function(){
    if(email.validity.valueMissing){
        $(this).next().html("电子邮件地址不能为空");
        $(this).next().removeClass().addClass("form_prompt_red");
    }
    else if(email.validity.typeMismatch){
        $(this).next().html("请输入正确的邮件地址");
        $(this).next().removeClass().addClass("form_prompt_red");
    }else{
        $(this).next().html("电子邮件地址正确");
        $(this).next().removeClass().addClass("form_prompt_green");
    }
}
var pho_num=document.getElementById("pho_num");
pho_num.onfocus=function(){
    $(this).next().html("请输入您的手机号码");
    $(this).next().removeClass().addClass("form_prompt");
}
pho_num.onblur=function(){
    if(pho_num.validity.valueMissing){
        $(this).next().html("手机号码不能为空");
        $(this).next().removeClass().addClass("form_prompt_red");
    } else if(pho_num.validity.patternMismatch){
        $(this).next().html("请输入正确的11位手机号码");
        $(this).next().removeClass().addClass("form_prompt_red");
    }else{
        $(this).next().html("手机号码输入正确");
        $(this).next().removeClass().addClass("form_prompt_green");
    }
}
var pro=document.getElementById("proving");
var a=draw();
var b=[];
pro.onfocus=function() {
    $(this).next().removeClass("form_prompt_green").addClass("form_prompt");
    for(var i=0;i< a.length;i++){
        b[i]=a[i];
    }
    return b;
};
var change=document.getElementById("change");
change.onclick=function(){
    pro.value="";
    a=draw();
    for(var i=0;i< a.length;i++){
        b[i]=a[i];
    }
    return b;
}
pro.onblur=function(){
    var prov=pro.value;
    if(prov==""){return false;}
    else{
        for(var i=0;i<prov.length;i++){
            var changeB=b[i];
            changeB=changeB.toLowerCase();
            var proP=prov[i];
            proP=proP.toLowerCase();
            if(proP!=changeB){
                pro.value="";
                change.click();
                 return;
            }
        }
       if(i>=b.length){
            $(this).next().html("验证正确");
            $(this).next().removeClass("form_prompt").addClass("form_prompt_green");
        }
    }
}
var btt=document.getElementById("register_btt");
btt.onclick=function(){
    var uname=username.value;
    var pwd=prov_pwd.value;
    var em=email.value;
    var phonum=pho_num.value;
    if(uname!=""&&pwd!=""&&em!=""&&phonum!=""){
        $.get('PHP/register_sql.php', {uname: uname, pwd: pwd, email: em, phonum: phonum}, function (data) {
            if (data == "true") {
                $(".register_succee").css("display", "block").prev().css("display", "none");
                $(".register_succee h1 b").html(uname);
                clearInterval(timer);
                timer = null
                var m = 5;
                var skip=document.getElementById("skip");
                var timer = setInterval(function () {
                    $(".register_succee h3 b").html(m);
                    m--;
                    if (m <= 0) {
                        m = 0;
                        skip.click();
                        clearInterval(timer);
                    }
                }, 1000);
                timer = null;
            }else{alert("您的注册不成功，请重新检查注册信息是否有误！");}
        })
    }else{alert("注册信息不得为空");}
}