$(function () {
    var map = new BMap.Map("map_content");
    // 创建地图实例
    var point = new BMap.Point(114.401479, 30.523894); //地点经纬度坐标
    // 创建点坐标
    map.centerAndZoom(point, 15);
    // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());

    //添加控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用


    //定位
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            console.log(r);
        }
    });

    //捕获用户拖动后地图中心点的经纬度坐标
    map.addEventListener("dragend", function () {
        var center = map.getCenter();
        console.log(center);
    });

    //城市检索，打开地图自动定位
    var local = new BMap.LocalSearch(map, {
        renderOptions: {
            map: map
        }
    });
    local.search("武汉抓现货电子商务有限公司");
})