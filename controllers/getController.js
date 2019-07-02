const postModel = require('../model/postModel')
module.exports = {
    getPostList(req, res) {
        let params = req.query
        console.log(params);
        postModel.getPostList(params, (err, data) => {
            console.log(err);
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