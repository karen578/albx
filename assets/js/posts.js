$(function () {
    var pagenum = 1
    var pagesize = 3
    render()

    function render(query) {
        $.ajax({
            type: 'get',
            url: '/getPostList',
            //传过去的参数
            // 传入的参数有，页数，一页显示的条数，和刷选时选的值
            data: {
                pagenum: pagenum,
                pagesize: pagesize,
                ...query
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
    //实现分类函数
    $(function () {
        $.ajax({
            type: 'get',
            url: '/getAllCateList',
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    var str = template("selectTem", res)
                    $('.cateSelector').html(str)
                }
            }
        })
    })
    //实现筛选函数
    $('.btn-search').on("click", function (event) {
        event.preventDefault()
        var query = {}
        if ($('.cateSelector').val() != 'all') {
            query.cate = $('.cateSelector').val()

        }
        if ($('.statusSelector').val() != 'all') {
            console.log($('.statusSelector').val());
            query.status = $('.statusSelector').val()
        }
        console.log(query);
        render(query)
    })
    //根据id删除数据
    $('tbody').on('click', '.btnDel', function () {
        if (window.confirm('确定删除数据')) {
            //需要把id获取到
            var id = $(this).data('id')
            $.ajax({
                type: 'get',
                url: '/delPostList',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {

                        render()
                    }
                }

            })
        }

    })
})