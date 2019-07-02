$(function () {
    $.ajax({
        type: 'get',
        url: '/getPostList',
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template('listTemp', res)
                $('tbody').html(htmlStr)
            }
        }
    })
})