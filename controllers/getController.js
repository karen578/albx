const postModel = require('../model/postModel')
module.exports = {
    getPostList(req, res) {
        postModel.getPostList((err, data) => {
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
    }
}