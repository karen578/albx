const formidable = require('formidable')
const path = require('path')
module.exports = {
    uploadFile(req, res) {
        //建立实例对象
        var form = new formidable.IncomingForm()
        //获取编码方式
        form.encoding = 'utf-8';
        //设置路径,需要设置成绝对路径
        form.uploadDir = __dirname + '/../uploads'
        //是否保留文件扩展名
        form.keepExtensions = true;
        //调用方法来实现文件上传
        form.parse(req, (err, fileds, files) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "上传失败"
                })
            } else {
                console.log(files);
                var filename = path.basename(files.img.path)
                res.json({
                    code: 200,
                    msg: "上传成功",
                    img: filename
                })
            }
        })

    }
}