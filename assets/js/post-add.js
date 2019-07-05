$(function () {
    // 获取所有分类数据
    $.ajax({
        type: 'get',
        url: '/getAllCateList',
        dataType: 'json',
        success: function (res) {
            var htmlStr = template("lisTemp", res)
            $('.cateSelector').html(htmlStr)
        }

    })
    //使用富文本框替代原来的文本框
    CKEDITOR.replace('content');



    //上传文件需要注册change事件
    $('#feature').on('change', function () {
        //准备数据，上传文件需要用到FormData()
        var data = new FormData()
        //追加属性‘img’这个属性是后台定的，files【0】这个表示要上传的文件
        // files:可以获取当前所有被选择文件对象，它是一个数组，里面的每一个值都是当前被选择的一个一个文件对象
        data.append('img', this.files[0])
        $.ajax({
            type: 'post',
            url: '/uploadFile',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    // 将文件名称存储到指定的隐藏域中
                    $('#usering').val(res.img)
                    //  给img添加新的属性，设置图片路径
                    $('img').attr('src', '/uploads/' + res.img).show()
                }

            }
        })



    })

    // 给保存按钮添加新的
    $('form').on('submit', function (event) {
        // 同步数据：将富文本框中的数据与textarea中的数据进行同步--两者同步之后数据会一样
        CKEDITOR.instances.content.updateElement()
        event.preventDefault()
        $.ajax({
            type: 'post',
            url: '/addPost',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    console.log(res);
                }
            }
        })
    })


})