$(function () {
    // 给登录按钮注册点击事件
    $('#btnLogin').on('click', function () {
        // 获取邮箱和密码的值，用val()
        var email = $('#email').val()
        var password = $('#password').val()
        console.log(email, password);
        // 用异步请求
        $.ajax({
            type: 'post',
            url: '/login',
            data: {
                email: email,
                password: password
            },
            beforeSend: function (res) {
                if (!/\w+[@]\w+[.]\w+/.test(email)) {
                    $('.alert-danger span').text('邮箱错误，请重新输入')
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)

                    return false
                }
                if (password.trim() == '') {
                    $('.alert-danger span').text('密码错误')
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)

                    return false
                }
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    if (window.confirm('登录成功')) {
                        location.href = '/admin'
                    }
                } else {
                    // 当密码或者邮箱不正确的时候提示信息显示出来
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').text(res.msg)
                }
            }
        })
    })
})