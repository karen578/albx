//引用其他模块
const postModel = require('../model/postModel')
//向外暴露数据
module.exports = {
    getPostList(req, res) {
        //当时get请求的时候用req.body接收前端页面发送过来的数据
        let params = req.query
        // console.log(params);
        // 利用回调函数，向页面发送查询结果
        console.log(params);
        postModel.getPostList(params, (err, data) => {
            console.log(err);
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
        var id = req.query
        postModel.delPostList(id, err => {
            if (err) return res.json({
                "code": 201,
                "msg": "删除失败"
            })
            res.json({
                "code": 200,
                "msg": "删除成功"
            })
        })
    }
}