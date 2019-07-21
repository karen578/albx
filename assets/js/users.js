
$(function () {
    render()
    //数据初始化
    function render() {
        $.ajax({
            type: 'get',
            url: '/getUsers',
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    var htmlStr = template("usersTemp", res)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }


    //删除用户
    $('tbody').on('click', '.btnDel', function () {
        var id = $(this).data('id')
        $.ajax({
            type: 'get',
            url: '/delUser',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                if (window.confirm('是否删除用户')) {
                    if (res.code == 200) {
                        render()
                    }
                }

            }
        })
    })
    //添加用户
    $('.btnAdd').on('click', function (event) {
        event.preventDefault()
        $.ajax({
            type: 'post',
            url: '/addUsers',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('#email').val('')
                    $('#slug').val('')
                    $('#nickname').val('')
                    $('#password').val('')
                    render()
                }
            }
        })
    })
    //根据id查找用户
    $('tbody').on('click', '.btnLook', function () {
        var id = $(this).data('id')
        $.ajax({
            type: 'get',
            url: '/getUserById',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('#email').val(res.data.email)
                    $('#slug').val(res.data.slug)
                    $('#nickname').val(res.data.nickname)
                    $('#password').val(res.data.password)
                    $('.btnAdd').hide()
                    $('.btnEdit').show()
                    //为后面的编辑做准备，需要把id存起来
                    $('[ name="id"]').val(res.data.id)
                    $('form h2').html('编辑用户')
                    render()
                }
            }
        })

    })
    //编辑用户
    $('form').on('click', '.btnEdit', function (event) {
        event.preventDefault()
        //因为编辑需要id，所以需要在头部那里设置隐藏域把id存在那里
        var id = $('[ name="id"]').val()
        // console.log(id);
        $.ajax({
            type: 'post',
            url: '/editUsers',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('#email').val('')
                    $('#slug').val('')
                    $('#nickname').val('')
                    $('#password').val('')
                    $('.btnAdd').show()
                    $('.btnEdit').hide()
                    $('form h2').html('添加用户')
                    render()
                }
            }
        })


    })
    //如果全选框选中，其他的单选框也要全选中，全选框取消，单选框也取消
    $('#btnAll').on('click', function () {
        //先获取全选框的有没有选中，用prop（）方法，得到的结果是true或者false
        var allcheck = $(this).prop('checked')
        //先用find（）的方法查找到全部的单选框，然后用prop（）方法对checked进行赋值
        var single = $('tbody').find(".singlecheck")
        single.prop('checked', allcheck)
        // if (allcheck) {
        //     $('.btndels').show()
        // }
        // 用类选择器获取单选框选中长度
        var shao = $('tbody').find(".singlecheck:checked").length
        if (shao > 1) {
            $('.btndels').show()
        } else {
            $('.btndels').hide()
        }
    })
    //如果单选框是全部选中的话，全选框也要全部选中，如果单选框没有全部选中，全选框也是没有勾选
    $('tbody').on('click', '.singlecheck', function () {
        var num = $('tbody').find(".singlecheck").length
        // console.log(num);
        var shao = $('tbody').find(".singlecheck:checked").length
        // console.log(shao);
        if (num == shao) {
            $('#btnAll').prop("checked", true)
        } else {
            $('#btnAll').prop("checked", false)
        }
        if (shao > 1) {
            $('.btndels').show()
        } else {
            $('.btndels').hide()
        }
    })
    //批量删除的
    $('.btndels').on("click",function(){
        //需要根据id号来删除数据
        //可以根据选中的单选框获取到id,用类选择器
        var btn=$('tbody').find(".singlecheck:checked")
        var arr=[]
        for(var i=0;i<btn.length;i++){
            //因为自定义属性获取id的data（）是jQuery的需要用$,也需要把在HTML页面写上data-id的自定义属性
            arr.push($(btn[i]).data("id"))
        }
         //把数组变成字符串用join（）
         var id=arr.join(',')
         // 发送ajax请求
         $.ajax({
             type:'get',
             url:'/delUser',
             data:{
                 id:id
             },
             dataType:'json',
             success:function(res){
                 if(window.confirm("是否批量删除用户")){
                    if(res.code==200){
                     render()
                    }
                 }
                 
             }
         }) 
    })







})