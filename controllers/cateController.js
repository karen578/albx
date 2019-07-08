const cateModel = require('../model/cateModel')
module.exports = {
    getAllCateList(req, res) {
        cateModel.getAllCateList((err, data) => {
            console.log(data);
            if (err) return res.json({
                code: 201,
                msg: '查询失败'
            })
            res.json({
                code: 200,
                msg: '查询成功',
                data: data
            })
        })
    },

}