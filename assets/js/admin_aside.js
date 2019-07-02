$(function () {
    //先获取路径
    var routerName = tool.getRouterName(location.href)
    //路由名称符合要求的时候就要给按钮添加上样式和类名
    if (routerName == 'posts' || routerName == 'post-add' || routerName == 'categories') {
        $('#menu-posts').addClass('in')
        $('#menu-posts').attr('aria-expanded', true)
    }
    if (routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings') {
        $('#menu-settings').addClass('in')
        $('#menu-settings').attr('aria-expanded', true)
    }
    $('li').removeClass('active')
    $('#' + routerName).addClass('active')
})