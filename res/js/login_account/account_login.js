$(function () {
    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;

        var phoneVal = $('.account_login_phone');
        var passwordVal = $('.account_login_password');

        phoneVal.on('blur',function(){
            if(phoneVal.val().length == 0){
                $('.error_tip_phone').show();
                $('.error_tip_phone i').text('请输入手机号');
            }else if(isPhone($(this).val()) == false){
                $('.error_tip_phone').show();
                $('.error_tip_phone i').text('请输入正确手机号');
            }else{
                $('.error_tip_phone').hide();
            }
        })

        passwordVal.on('blur',function(){
            if(passwordVal.val().length == 0){
                $('.error_tip_password').show();
                $('.error_tip_password i').text('请输入密码');
            }else if(isPassword($(this).val()) == false){
                $('.error_tip_password').show();
                $('.error_tip_password i').text('请输入6-15位数字或字母');
            }else{
                $('.error_tip_password').hide();
            }
        })

        //登录
        form.on('submit(login_now)', function (data) {
            if (isPhone(phoneVal.val()) == true && isPassword(passwordVal.val()) == true) {
                console.log(data.field);
                // $.ajax({
                //     url: '',
                //     dataType: 'json',
                //     type: 'POST',
                //     data: {},
                //     success: function (result) {
                //         if (result.status == 200) {
                //             console.log(result);
                //         }
                //     }
                // });
            }
            return false;
        });
    });

    $('.erweima').on('click', function () {
        window.location.href = 'account_sweepCode.html'; //跳转到扫码登录页面
    })
    
})