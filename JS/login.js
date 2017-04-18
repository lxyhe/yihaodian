//TODO 在当前的function中使用的$指的是jQuery
jQuery(function($){
    var name=window.sessionStorage.getItem('user_name');
    if(name!==null){
        $("#login").parent("li").html("欢迎您，"+window.sessionStorage.getItem('user_name'));
    }
    var user_id;
    //TODO 弹出登录模态框
    $("#login").click(function(event){
        event.preventDefault();
        $(".modal").attr("style","display:block");
    });
    //TODO 异步实现用户登录
    $("#loginsubmit").click(function(event){
       event.preventDefault();
       /*
         TODO jQuery的Ajax方式实现异步提交表单
         TODO 1.阻止表单的默认提交
         TODO 2.手动获取表单元素的值
         TODO 3.调用Ajax实现异步提交
         TODO 4.接收服务器端的响应,并作出处理
        */
        //TODO 1.获取表单数据
        var requestData = {
            "loginname" : $("#loginname").val(),
            "loginpwd" : $("#loginpwd").val()
        }
        //TODO 2.Ajax实现异步提交
        $.post($("#formlogin").attr("action"),requestData,function(response){
            //TODO 判断是否登录成功
            if(response.code == 0){//ERROR
                //TODO 重新输入再登录
                $(".msg-warn").attr("style","display:none");
                $(".msg-error").removeAttr("style").html("<b></b>用户名或密码错误.")
            }else{//SUCCESS
                window.sessionStorage.setItem('user_name',response.uname)
                //TODO 1.将登录框隐藏
                $(".modal").attr("style","display:none");
                //TODO 2.将用户名信息写入sessionStorage中
                window.sessionStorage.setItem(response.uid,response.uname);
                //TODO 3.显示欢迎信息
                $("#login").parent("li").html("欢迎您，"+window.sessionStorage.getItem('user_name'));
                //TODO 4.将user_id的值赋值给全局变量
                user_id = response.uid;
            }
        },"json");
    });
    //TODO 切换到用户中心
    $("#my_one").click(function(){
        //TODO 利用sessionStorage判断是否登录
        var user_name = window.sessionStorage.getItem(user_id);
        if(user_name){
            $("#banner_change,#main,.product_popup_news,.news_flash").attr("style","display:none");
            $("#menu").attr("style","display:block");
        }else{
            $(".modal").attr("style","display:block");
        }
        getMyOrders(user_name,1,0);
        pagercount(user_name);
    });
    //TODO 我的订单
    function getMyOrders(uname,page,num){
        $.getJSON('PHP/my_order.php',{uname:uname,page:page},function(output){
            console.log("正在处理响应数据...");
            $.each(output.data,function(i,order){
                var html ="<tr"+"><td colspan='6'"+">订单编号："+order.order_num+"<a href='#'"+">"+order.shop_name+"</a"+"><"+"/td><"+"/tr><"+"tr><"+"td>";
                $.each(order.productList,function(i,p){
                    html+="<img src="+p.product_img+" title="+p.product_name+">";
                });
                var sta=order.order_state;
                html+="</td"+"><"+"td>"+order.user_name+"</td"+"><"+"td>￥"+order.price+"<br"+">"+order.payment_mode+"</td"+"><"+"td>"+order.submit_time+"</"+"td><"+"td>"+(sta==1?"等待付款":(sta==2?"等待发货":(sta==3?"支付完成":"确认收货")))+"</td"+"><td"+"><a href='#'"+">查看</a"+"><br"+"><"+"a href='#'>评价晒单</a"+"><br"+"><a href='#'"+">还要买</a"+"><br"+"></td"+"></tr"+">";
                $('#order-table tbody').append(html);
            });
            $('#order-table tbody tr:nth-child(even) td:nth-child(4)').each (function(i,td){
                var t = td.innerHTML;
                t = t.replace('T', '<br>');
                td.innerHTML = t;
            });
            if (num===0){
                var html="<li class='active'"+"><"+"a>1<"+"/a><"+"/li>";
                for (var i=2,html;i<=output.pagecount;i++){
                    html+="<li"+"><"+"a>"+i+"<"+"/a><"+"/li>";
                }
                $('.pager').append(html);
            }
        });
    }
    function pagercount(uname){
        $('.pager').on('click','li',function(e){
            e.preventDefault();
            $(this).addClass('active').siblings('.active').removeClass();
            var page=$(this).children().html();
            var num=1;
            $("#order-table tbody").empty();
            getMyOrders(uname,page,num);
        })
    }
    //TODO 用户中心菜单切换
    $('#menu li a').click(function(event){
        event.preventDefault();
        $(this).addClass("selected").parents("li").siblings("li").find("a").removeClass();
        var href = $(this).attr("href");
        $(href).attr("style","display:block").siblings().attr("style","display:none");
    });
    //TODO 获取幸运抽奖按钮
    $('[href="#luck-lottery-container"]').click(function(event){
        event.preventDefault();//TODO 阻止跳转
        //TODO 用户当前可抽奖的次数
        var requestData = {
            "user_name" : window.sessionStorage.getItem(user_id)
        };
        $.post("PHP/luck_stat.php",requestData,function(response){
            //TODO 判断是否还有抽奖 次数
            if(response.left <= 0){//TODO 不能抽奖
                response.left=0;
                $("#bt-lottery").attr("disabled","disabled").html("总共抽奖次数为"+response.total+"次,剩余"+response.left+"次");
            }else{//TODO 允许抽奖
                $("#bt-lottery").html("总共抽奖次数为"+response.total+"次,剩余"+response.left+"次");
            }
        },"json");

        //TODO Canvas绘制静态幸运转盘效果
        var canvas = $("#canvas-lottery")[0];
        var context = canvas.getContext("2d");
        //TODO 常量定义
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        //TODO 1.将画布右下平移
        context.translate(WIDTH/2,HEIGHT/2);
        /*
          TODO canvas绘制图片的步骤
          TODO 1.加载对应的图片
          TODO   var img = new Image();
          TODO 2.保证图片加载完毕
          TODO   img.onload = function(){
          TODO 3.绘制图片
          TODO   }
          TODO 问题:先绘制转盘,再绘制指针
         */
        var flag = 0;
        var imgPan = new Image();
        imgPan.src = "images/pan.png";
        imgPan.onload = function(){
            flag += 50;//TODO 表示转盘加载完毕
            if(flag == 100){
                paintImg();
            }
        }
        var imgPin = new Image();
        imgPin.src = "images/pin.png";
        imgPin.onload = function(){
            flag += 50;//TODO 表示指针加载完毕
            if(flag == 100){
                paintImg();
            }
        }

        $("#bt-lottery").click(function(){
            //TODO 禁用按钮
            $("#bt-lottery").attr("disabled","disabled");
            var angle = 0;//TODO 旋转角度
            var duration = Math.random()*3000+5000;//TODO 旋转的时长
            var time = 0;//TODO 当前执行的时长
            //TODO 定时器 - 旋转起来
            var t=null;
            t=setInterval(function(){
                //TODO 角度增加
                angle++;//TODO 每次增加一度
                //TODO 执行时长的累加
                time += 50;
                /*
                 TODO 2.画布的旋转方法
                 TODO rotate(角度)
                 TODO 公式 - Math.PI/180*角度
                 */
                context.rotate(Math.PI/180*angle);
                //TODO 3.绘制两张图片
                context.drawImage(imgPan,-imgPan.width/2,-imgPan.height/2);
                //TODO 指针不能旋转
                context.rotate(-Math.PI/180*angle);
                context.drawImage(imgPin,-imgPin.width /2,-imgPin.height/2);
                //TODO 当前是否达到总时长
                if(time >= duration){
                    clearInterval(t);//TODO 停止旋转
                    $("#bt-lottery").removeAttr("disabled");//TODO 重新启用按钮
                    //TODO 获取用户当前的抽奖结果
                    getResult(angle);
                }
            },50);
        });
        function getResult(angle){
            var result;
            //TODO 通过转盘旋转角度计算有效角度
            angle = angle%360;
            if(angle>270 && angle<300){//一等奖
                result = "一等奖";
            }else if((angle>0 && angle<30) || (angle>210 && angle<240)){//二等奖
                result = "二等奖";
            }else if((angle>30 && angle<60) || (angle>90 && angle<120) || (angle>150 && angle<180) || (angle>300 && angle<330)){//三等奖
                result = "三等奖";
            }else{//幸运奖
                result = "幸运奖";
            }
            //TODO 将获奖信息保存到数据库中
            var requestData = {
                "user_name" : window.sessionStorage.getItem(user_id),
                "level" : result
            }
            $.post("PHP/lottery_save.php",requestData,function(response){
                console.log(response);
                if(response.left <= 0){//TODO 不能抽奖
                    response.left=0;
                     $("#bt-lottery").attr("disabled","disabled").html("总共抽奖次数为"+response.total+"次,剩余"+response.left+"次");
                }else{//TODO 允许抽奖
                    $("#bt-lottery").html("总共抽奖次数为"+response.total+"次,剩余"+response.left+"次");
                }
            },"json");
        }
        function paintImg(){
            context.drawImage(imgPan,-imgPan.width/2,-imgPan.height/2);
            context.drawImage(imgPin,-imgPin.width/2,-imgPin.height/2);
        }
    });
    //TODO 用户消费统计
    $('[href="#buy-stat-container"]').click(function(event){
        event.preventDefault();
        //TODO 定义用于测试的数据内容
        var datas = [580,640,320,30,870,690,830,960,1024,206];

        //TODO 获取canvas创建画布对象
        var canvas = $("#canvas-buy-stat")[0];
        var context = canvas.getContext("2d");
        //TODO 利用 Chart.js 库完成绘制柱状图
        /*
          TODO 创建统计图表
          TODO new Chart(context,options)
          TODO * context - 画布对象
          TODO * options - 数据及配置信息
          TODO   {
          TODO      type : 设置绘制的统计图表类型(柱状图)
          TODO      data : 统计图表的数据内容
          TODO      options : 配置当前的统计图表
          TODO   }
         */
        var chartData = {
            //TODO 统计图表显示的提示内容
            labels : ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
            //TODO 统计图表的数据内容
            datasets : [{
                label : "用户消费统计图表",
                backgroundColor : "rgba(220,220,220,0.5)",
                data : datas
            }]
        }

        new Chart(context,{
            type : "bar",
            data : chartData,
            options : {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                        borderColor: 'rgb(0, 255, 0)',
                        borderSkipped: 'bottom'
                    }
                }
            }
        });
    });









});