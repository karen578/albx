const userModel = require('../model/userModel')
module.exports = {
    login(req, res) {
        let {
            email
        } = req.body
        let {
            password
        } = req.body
        console.log(email, password);
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
                    if (password == data[0].password) {
                        res.json({
                            code: 200,
                            msg: "登录成功"
                        })
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