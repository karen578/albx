var tool = {
    getRouterName: (href => {
        // 获取url地址栏中？的所在位置的索引值
        var index = href.indexOf('?')
        // 3.没有数据怎么获取路由
        var routerName = ''
        if (index == -1) {
            routerName = href.substring(href.lastIndexOf('/' + 1))
        } else {
            routerName = href.substring(href.lastIndexOf('/') + 1, href.indexOf('?'))
        }
        return routerName
    })
}