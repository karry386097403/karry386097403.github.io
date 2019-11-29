$(function () {
    clearInterval(pic);
    var pic = setInterval(function () {
        $('.normal_pic').attr('src', '../../res/images/login/none.png');
        $('.refresh_pic').show(); //刷新图标
        $('.please').text('二维码已失效，点击刷新');
        clearInterval(pic);
    }, 5000)

    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        //绑定账号弹窗
        $('.refresh_pic').on('click', function () {
            var index = layer.open({
                type: 1,
                area: ['350px', '350px'],
                title: false, //关闭默认的标题
                content: $('#account_bind'),
                success: function () {
                    //清空输入框的值，隐藏错误信息
                    $('.content_first_phone').val('');
                    $('.content_first_password').val('');
                    $('.error_tip_phone').hide();
                    $('.error_tip_password').hide();

                    $('#account_bind .title img').on('click',function(){
                        layer.close(index);
                    })
                }
            });
            
            var phoneVal = $('.content_first_phone');
            var passwordVal = $('.content_first_password');

            phoneVal.on('blur',function(){
                if(phoneVal.val().length == 0){
                    $('.error_tip_phone').show(); //手机号错误提示
                    $('.error_tip_phone i').text('请输入手机号');
                }else if(isPhone(phoneVal.val()) == false){
                    $('.error_tip_phone').show(); //手机号错误提示
                    $('.error_tip_phone i').text('手机号格式不正确');
                }else{
                    $('.error_tip_phone').hide();
                }
            })

            passwordVal.on('blur',function(){
                if(passwordVal.val().length == 0){
                    $('.error_tip_password').show(); //密码错误提示
                    $('.error_tip_password i').text('请输入登录密码');
                }else if(isPassword(passwordVal.val()) == false){
                    $('.error_tip_password').show(); //密码错误提示
                    $('.error_tip_password i').text('请输入6-15位数字或字母');
                }else{
                    $('.error_tip_password').hide();
                }
            })

            //绑定按钮
        form.on('submit(bind_now)', function(data){
            if (isPhone(phoneVal.val()) == true && isPassword(passwordVal.val()) == true) {
                console.log(data.field);
                layer.msg('绑定账号成功，下次可直接扫码登录');

                clearTimeout(loginLink);
                var loginLink = setTimeout(function(){
                    window.location.href = '../../login/account/account_login.html';//3秒后自动跳转到登录页面
                    clearTimeout(loginLink);
                },3000)
            }
            return false; 
          });
        })
    });

    $('.erweima').on('click', function () {
        window.location.href = 'account_login.html'; //跳转到扫码登录页面
    })
})