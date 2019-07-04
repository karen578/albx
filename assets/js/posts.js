$(function () {
    var pagenum = 1
    var pagesize = 3
    render()

    function render() {
        $.ajax({
            type: 'get',
            url: '/getPostList',
            //传过去的参数
            data: {
                pagenum: pagenum,
                pagesize: pagesize
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    // 用模板引擎渲染数据
                    var htmlStr = template('listTemp', res)
                    $('tbody').html(htmlStr)
                    // 调用分页函数，参数，总页数（用总条数 除以 每页显示多少条，再向上取整）
                    //总条数是后台传过来的数据
                    setPage(Math.ceil(res.data.total / pagesize))
                }
            }
        })
    }
    //实现分页的函数
    function setPage(count) {
        // <!--使用bootstrap插件必须使用引入jquery,因为bootstrap是基于jquery开发的--> 
        //如果bootstrap的版本是2.X的分页必须使用div元素。3.X分页的必须使用ul>li元素。注意与bootstrap版本对应上。
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pagenum,
            // 总页数
            totalPages: count,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, page) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                // console.log(page);
                //这个page就是当前的合理页码值，我们只需要将全局的pagenum重置，并且重新获取数据就可以了
                pagenum = page
                render()
            }
        })
    }

})