$(function(){
    layui.use(['form','layer'] , function(){
        var form = layui.form;
        var layer = layui.layer;

        var phoneVal = $('.account_register_phone');
        var codeVal = $('.account_register_code');
        var passwordVal = $('.account_register_password');
        var comfirmVal = $('.account_register_comfirm_Password');

        phoneVal.on('blur',function(){
            if(phoneVal.val().length == 0){
                $('.wrong_show_phone').show();//手机号错误提示
                $('.wrong_show_phone i').text('请输入手机号');
            }else if(isPhone($(this).val()) == false){
                $('.wrong_show_phone').show();//手机号错误提示
                $('.wrong_show_phone i').text('手机号格式不正确');
            }else{
                $('.wrong_show_phone').hide();
            }
        })

        codeVal.on('blur',function(){
            if(codeVal.val().length == 0){
                $('.wrong_show_code').show();//验证码错误提示
                $('.wrong_show_code i').text('请输入验证码');
            }else{
                $('.wrong_show_code').hide();
            }
        })

        passwordVal.on('blur',function(){
            if(passwordVal.val().length == 0){
                $('.wrong_show_password').show();//密码错误提示
                $('.wrong_show_password i').text('请输入登录密码');
            }else if(isPassword($(this).val()) == false){
                $('.wrong_show_password').show();//密码错误提示
                $('.wrong_show_password i').text('请输入6-15位数字或字母');
            }else{
                $('.wrong_show_password').hide();
            }
        })

        comfirmVal.on('blur',function(){
            if(comfirmVal.val() == 0){
                $('.wrong_show_comfirm').show();//确认密码错误提示
                $('.wrong_show_comfirm i').text('请确认密码');
            }else if($(this).val() !== $('.account_register_password').val()){
                $('.wrong_show_comfirm').show();//确认密码错误提示
                $('.wrong_show_comfirm i').text('确认密码与登录密码不一致，请核对');
            }
        })

        form.on('submit(register_now)',function(data){
            //data.field.rule(勾选协议)
            $('.register_now').css({'cursor':'pointer','background-color':'#D82335'});//注册按钮恢复
            if(isPhone(phoneVal.val()) == true && codeVal.val() !== 0 && isPassword(passwordVal.val()) == true && comfirmVal.val() == passwordVal.val() && data.field.rule == 'agree'){
                console.log(data.field);
            }
            return false;
        })
        

          //发送短信验证码
        var vercode = 0;
        var time = 60;
        var flag = true;
        //防止用户连续点击
        var send = function () {
            $('.get_code').addClass('submit_disabled');
            var phone = $('.account_register_phone').val();
            if (flag) {
                var timer = setInterval(function () {
                    if (time == 60 && flag && phone !== '') {
                        flag = false;

                        $.ajax({
                            type: 'get',
                            async: false,
                            url: '',
                            data: { phoneNumber: phone },
                            dataType: 'json',
                            success: function (res) {
                                if (res.Code == 200) {
                                    vercode = res.data;
                                    $('.get_code').html('已发送');
                                    layer.msg('验证码已发送');
                                } else {
                                    layer.msg('验证码发送失败');
                                    flag = true;
                                    time = 60;
                                    clearInterval(timer);
                                }
                            },
                            error: function (info) {
                                console.log(info);
                            }
                        })
                    } else if (time == 0) {
                        $('.get_code').removeClass('submit_disabled');
                        $('.get_code').html('获取验证码');
                        clearInterval(timer);
                        time = 60;
                        flag = true;
                        $('.get_code').bind("click", function () {
                            send();//启用a点击事件
                        });
                    } else {
                        $('.get_code').html(time + 's 后可重新获取');
                        time--;
                        $('.get_code').unbind("click");//禁用a点击事件
                    }
                }, 1000)
            }
        }
        $('.get_code').click(function () {//解决页面打开自动发送验证码
            if (isPhone(phoneVal.val()) == true) {
                send();
                layer.msg('验证码已发送');
            } else {
                $('.wrong_show_phone').show();//手机号错误提示
                $('.wrong_show_phone i').text('手机号格式不正确');
            }
        });
      });
})