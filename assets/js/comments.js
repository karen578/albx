$(function () {
    var pagenum = 1
    var pagesize = 4
    init()

    function init() {

        $.ajax({
            type: 'get',
            url: '/getCommentList',
            data: {
                pagenum: pagenum,
                pagesize: pagesize
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    var htmlStr = template("lisTemp", res)
                    $('tbody').html(htmlStr)
                    // 调用分页函数.参数:当前所在页, 总页数(用总条数 除以 每页显示多少条,在向上取整), ajax函数
                    //因为后台返回的数据是存放在data中
                    setPage(Math.ceil(res.data.total / pagesize))
                }
            }
        })
    }

    function setPage(count) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            pagenum: pagenum,
            // 总页数
            totalPages: count,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, page) {
                // 把当前点击的页码赋值给currentPage
                pagenum = page
                init()
            }
        })
    }
})