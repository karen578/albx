const cateModel = require('../model/cateModel')
module.exports = {
    getAllCateList(req, res) {
        cateModel.getAllCateList((err, data) => {
            // console.log(data);
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
    getcateById(req, res) {
        let {
            id
        } = req.query
        cateModel.getcateById(id, (err, data) => {
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
    delcateById(req, res) {
        let {
            id
        } = req.query
        cateModel.delcateById(id, err => {
            console.log(err);
            if (err) return res.json({
                code: 201,
                msg: '删除失败'
            })
            res.json({
                code: 200,
                msg: '删除成功'
            })
        })

    },
    editcateById(req, res) {
        let obj = req.body
        console.log(obj);
        cateModel.editcateById(obj, err => {
            console.log(err);
            if (err) return res.json({
                code: 201,
                msg: '编辑失败'
            })
            res.json({
                code: 200,
                msg: '编辑成功'
            })
        })
    },
    Addcate(req, res) {
        let obj = req.body
        // console.log(obj);
        cateModel.Addcate(obj, err => {
            // console.log(err);
            if (err) return res.json({
                code: 201,
                msg: '添加失败'
            })
            res.json({
                code: 200,
                msg: '添加成功'
            })
        })
    }

}