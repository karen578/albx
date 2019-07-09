$(function () {
    render()

    function render() {
        $.ajax({
            url: '/getAllCateList',
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    var htmlStr = template("lisTem", res)
                    $("tbody").html(htmlStr)
                }
            }
        })
    }
    $('#addcate').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/Addcate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('#name').val('')
                    $('#slug').val('')
                    $('[name="id"]').val('')
                    render()
                }
            }
        })

    })
    //根据id获取数据
    $('tbody').on("click", ".btnEdit", function () {
        var id = $(this).data("id")
        var name = $(this).data("name")
        var slug = $(this).data("slug")
        $.ajax({
            type: 'get',
            url: '/getcateById',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    console.log(res);
                    $('#name').val(name)
                    $('#slug').val(slug)
                    $('[name="id"]').val(id)
                    $('#editcate').show()
                    $('#addcate').hide()
                }
            }
        })
    })
    //编辑分类
    $('#editcate').on('click', function () {
        var id = $('[name="id"]').val()
        $.ajax({
            type: 'post',
            url: '/editcateById',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('#name').val('')
                    $('#slug').val('')
                    $('[name="id"]').val('')
                    $('#addcate').show()
                    $('#editcate').hide()
                    render()
                }
            }
        })

    })
    //根据id删除数据
    $('tbody').on("click", ".btnDel", function () {
        if (window.confirm('是否删除分类数据')) {
            var id = $(this).data("id")
            $.ajax({
                type: 'get',
                url: '/delcateById',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {
                        location.href = '/admin/categories'
                    }
                }
            })

        }
    })


    //单选和复选
    //选择全选框,用change事件
    $('.ckAll').on('change', function () {
        // 用一个值存储全选框的属性 获取有没有选中的属性用prop（）方法
        var status = $(this).prop('checked')
        // tbody下面的单选框和复选框的选不选中状态一样
        //因为单选框是异步生成的，需要用父元素查找出我们想要的元素，
        $('tbody').find('.ckSingle').prop('checked', status)
        // 获取单选框的长度
        //如果是全选的话，就需要把批量删除显示出来
        if (status) {
            $('.btnDels').show(500)
        }
        // 获取单选框选中的数量
        var num = $('tbody').find('.ckSingle:checked').length
        // 如果是大于1条就要把批量删除显示出来
        if (num > 1) {
            $('.btnDels').show(500)
        } else {
            $('.btnDels').hide(500)
        }


    })
    $('tbody').on('change', '.ckSingle', function () {
        //获取点击单选框被选住的长度，用伪类选择器
        var num = $('tbody').find('.ckSingle:checked').length
        if (num > 1) {
            // console.log(num);
            $('.btnDels').show(500)
        } else {
            $('.btnDels').hide(500)
        }
        //如果单选框全部选中，全选框也要全部选中
        //   全部单选框的数量
        var str = $('tbody').find('.ckSingle').length
        if (num == str) {
            $('.ckAll').prop('checked', true)
        } else {
            $('.ckAll').prop('checked', false)
        }
    })
    // 给批量删除添加点击事件，根据id 删除数据
    $('.btnDels').on("click", function () {
        // 获取选中单选框的信息，是一个数组
        var allchk = $('tbody').find('.ckSingle:checked')
        var arr = []
        // 便利数组，把获得的id值追击到空数组里面
        for (var i = 0; i < allchk.length; i++) {
            arr.push($(allchk[i]).data('id'))
        }
        // 报获取到的数组用join（）的方法转换成字符串
        var id = arr.join(',')
        $.ajax({
            type: 'get',
            url: '/delcateById',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                if (window.confirm('是否删除这几条数据')) {
                    if (res.code == 200) {
                        render()
                    }
                }
            }
        })
    })


})