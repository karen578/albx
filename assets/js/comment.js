var tool = {
    getRouterName: href => {
        // 获取url地址栏中？的所在位置的索引值
        var index = href.indexOf('?')
        // 定义一个变量储存参数
        var routerName = '';
        // 判断是否有参数
        if (index == -1) { //没有参数
            routerName = href.slice(href.lastIndexOf('/') + 1)
        } else {
            routerName = href.slice(href.lastIndexOf('/') + 1, href.indexOf('?'))
        }
        return routerName
    }
}