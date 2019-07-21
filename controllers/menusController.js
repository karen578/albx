const menusModel = require('../model/menusModel')

module.exports = {
    addmenus(req, res) {
        let obj = req.body
        //因为没有图标，所有需要默认
        obj.icon = 'fa fa-glass'
        console.log(obj);
        menusModel.addmenus(obj, err => {
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
    getmenus(req, res) {
        menusModel.getmenus((err, data) => {
            // console.log(data);
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
    getOptions(req, res) {
        menusModel.getOptions((err, data) => {
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
    updateOptions(req, res) {
        let obj = req.body
        menusModel.updateOptions(obj, err => {
            console.log(err);
            if (err) return res.json({
                code: 201,
                msg: '更新失败'
            })
            res.json({
                code: 200,
                msg: '更新成功'
            })
        })
    }
}