//名字需要等于引用文件中暴露的名字
const conn = require('../model/common.js')

module.exports = {
    getCommentList(params, callback) {
        let sql = `
        SELECT comments.id pid,comments.author,comments.email,comments.created,comments.content,comments.status,comments.post_id,comments.parent_id,posts.title
        FROM comments
        inner join posts on comments.post_id=posts.id
        limit ${(params.pagenum-1)*params.pagesize},${params.pagesize}
        `
        conn.query(sql, (err, result) => {
            if (err) return callback(err)
            sql = 'SELECT COUNT(*)sum FROM comments'
            conn.query(sql, (err1, result1) => {
                if (err1) return callback(err1)
                callback(null, {
                    result: result,
                    total: result1[0].sum
                })
                // console.log(result1[0].sum);

            })

        })

    }
}