//引用其他模块
const postModel = require('../model/postModel')
const moment = require('moment')
//向外暴露数据
module.exports = {
    getPostList(req, res) {
        //当时get请求的时候用req.body接收前端页面发送过来的数据
        let params = req.query
        // console.log(params);
        // 利用回调函数，向页面发送查询结果
        console.log(params);
        postModel.getPostList(params, (err, data) => {
            //用res.json可以直接把查询到的数据转换成字符串
            if (err) return res.json({
                "code": 201,
                "msg": "查询失败"
            })
            res.json({
                "code": 200,
                "msg": "查询成功",
                "data": data

            })
        })
    },
    delPostList(req, res) {
        //   需要接收传过来的id参数
        var id = req.query.id
        postModel.delPostList(id, err => {
            console.log(err);
            if (err) return res.json({
                "code": 201,
                "msg": "删除失败"
            })
            res.json({
                "code": 200,
                "msg": "删除成功"
            })
        })
    },
    addPost(req, res) {
        let obj = req.body
        obj.id = null
        obj.views = 0
        obj.likes = 0
        obj.user_id = req.session.currentUser.id
        postModel.addPost(obj, err => {
            if (err) return res.json({
                code: 201,
                msg: '添加失败'
            })
            res.json({
                code: 200,
                msg: '添加成功'
            })
        })
    },
    getPostById(req, res) {
        var {
            id
        } = req.query

        postModel.getPostById(id, (err, data) => {
            if (err) return res.json({
                "code": 201,
                "msg": "查询失败"
            })
            // 需要把日期转换成游览器需要日期格式传递给前端
            data.created = moment(data.created).format('YYYY-MM-DDTHH:mm:ss')
            res.json({
                "code": 200,
                "msg": "查询成功",
                "data": data
            })

        })
    }


}