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
    },
    getUsers(req, res) {
        userModel.getUsers((err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "获取用户信息失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "获取用户信息成功",
                    data: data
                })
            }
        })
    },
    delUser(req, res) {
        let {
            id
        } = req.query

        userModel.delUser(id, err => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "删除用户信息失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "删除用户信息成功"
                })
            }
        })
    },
    addUsers(req, res) {
        let obj = req.body
        // console.log(obj);
        obj.status = 'unactivated'
        obj.avatar = '/uploads/avatar.jpg'
        userModel.addUsers(obj, err => {
            // console.log(err);
            if (err) {
                res.json({
                    code: 201,
                    msg: "添加用户信息失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "添加用户信息成功"
                })
            }
        })
    },
    getUserById(req, res) {
        var {
            id
        } = req.query
        userModel.getUserById(id, (err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "获取用户信息失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "获取用户信息成功",
                    data: data
                })
            }

        })
    },
    editUsers(req, res) {
        var obj = req.body
        userModel.editUsers(obj, err => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "编辑用户信息失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "编辑用户信息成功"
                })
            }
        })

    }

}