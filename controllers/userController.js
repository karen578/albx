const userModel = require('../model/userModel')
module.exports = {
    login(req, res) {
        // 当post请求的时候用req。body接收数据
        let {
            email
        } = req.body
        let {
            password
        } = req.body
        // console.log(email, password);
        userModel.login(email, (err, data) => {
            //如果没有数据返回
            if (err) {
                res.json({
                    code: 400,
                    msg: "服务器异常"
                })
            } else {
                //有没有查询到数据
                if (data) {
                    if (password == data.password) {
                        //将登录成功的状态写入到cookie
                        // res.writeHead(200, {
                        //     'Set-Cookie': 'islogin=true'
                        // })
                        // 以session方式来实现状态保存，这里写入session数据
                        req.session.isLogin = 'true'
                        req.session.currentUser = data
                        res.end(JSON.stringify({
                            code: 200,
                            msg: "登录成功"
                        }))
                    } else {
                        res.json({
                            code: 400,
                            msg: "密码有误请重新输入"
                        })
                    }
                } else {
                    res.json({
                        code: 400,
                        msg: "邮箱有误请重新输入"
                    })
                }
            }
        })
    }

}