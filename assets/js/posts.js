$(function () {
    $.ajax({
        type: 'get',
        url: '/getPostList',
        data: {
            pagenum: 1,
            pagesize: 2
        },
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template('listTemp', res)
                $('tbody').html(htmlStr)
            }
        }
    })
})