$(function () {
    $('#btnLogin').on('click', function () {
        var email = $('#email').val()
        var password = $('#password').val()
        console.log(email, password);
        $.ajax({
            type: 'post',
            url: '/login',
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    location.href = '/admin'
                } else {
                    $('.alert-danger').css('display', "block")
                    $('.alert-danger span').text(res.msg)
                }
            }
        })
    })
})