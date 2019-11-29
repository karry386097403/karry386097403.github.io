//手机号验证
function isPhone(phone) {
    var myreg = /^1(3|4|5|7|8)\d{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

//密码验证
function isPassword(password) {
    var myreg = /^[A-Za-z0-9]\w{5,14}$/;
    if (!myreg.test(password)) {
        return false;
    } else {
        return true;
    }
}

//邮箱验证
function isEmail(email) {
    var myreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!myreg.test(email)) {
        return false;
    } else {
        return true;
    }
}

$(function(){
    $('#baidu_map').on('click',function(){
        window.open('../../login/map/map_login.html');//跳转到百度站外地图页面
    })
})

layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;

})