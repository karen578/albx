const commentModel = require('../model/commentModel')

module.exports = {
    getCommentList(req, res) {
        let params = req.query
        commentModel.getCommentList(params, (err, data) => {
            // console.log(data);
            if (err) {
                res.json({
                    code: 201,
                    msg: '查询失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '查询成功',
                    data: data
                })
            }
        })
    }
}