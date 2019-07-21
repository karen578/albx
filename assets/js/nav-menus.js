$(function () {
    render()
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addmenus',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {

                if (res.code == 200) {
                    $('#text').val('')
                    $('#title').val('')
                    $('#link').val('')
                    render()

                }
            }
        })
    })

    function render() {
        $.ajax({
            type: 'get',
            url: '/getmenus',
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    var htmlStr = template("menueTemp", res)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }







})