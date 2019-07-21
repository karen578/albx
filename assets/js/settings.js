$(function () {
    $.ajax({
        type: 'get',
        url: '/getOptions',
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                // $('#site_url').val(res.data[0].value)
                // $('#site_logo').val(res.data[1].value)
                // $('#site_name').val(res.data[2].value)
                // $('#site_description').val(res.data[3].value)
                // $('#site_keywords').val(res.data[4].value)
                // $('#comment_status').val(res.data[6].value)
                // $('#comment_reviewed').val(res.data[7].value)
                $('form').html(template('optionsTemp', res))
            }
        }
    })
    $('form').on('click', '.btnSave', function (event) {
        var obj = {}
        obj.site_name = $('#site_name').val()
        obj.site_url = $('#site_url').val()
        obj.site_logo = $('#site_logo').val()
        obj.site_description = $('#site_description').val()
        obj.site_keywords = $('#site_keywords').val()
        obj.comment_status = $('#comment_status').prop('checked') ? 1 : 0
        obj.comment_reviewed = $('#comment_reviewed').prop('checked') ? 1 : 0

        event.preventDefault()
        // var str = $('form').serialize()
        // str = decodeURIComponent(str, true)
        // var obj = convertToObj('?' + str)
        // obj.comment_reviewed = obj.comment_reviewed ? '0' : '1'
        // obj.comment_status = obj.comment_status ? '0' : '1'
        $.ajax({
            type: 'post',
            url: '/updateOptions',
            data: obj,
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    console.log(res);
                }
            }
        })

    })

    function convertToObj(str) {
        str = str.slice(1)
        var arr = str.split("&")
        obj = {}
        arr.forEach(function (item) {
            var temp = item.split("=")
            obj[temp[0]] = temp[1]
        })
        return obj
    }






})