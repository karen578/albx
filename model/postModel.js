//引入第三方模块
const mysql = require('mysql')
//连接数据库
const conn = mysql.createConnection({
    //数据库的ip地址
    host: '127.0.0.1',
    //数据库的名称
    user: 'root',
    //数据库的密码
    password: 'root',
    //数据库的的存放数据的位置名称
    database: 'baixiu',
    // 数据库的转换日期的时候默认是转换成日期对象格式，需要自己进行转换正确的日期
    dateStrings: true
})
//向外暴露数据
module.exports = {
    getPostList(params, callback) {
        //sql语句
        let sql = `select posts.id pid,posts.slug,posts.title,posts.feature,posts.created,posts.content,posts.status,users.id uid,users.nickname,categories.name
        from posts
        inner join users on posts.user_id = users.id
        inner join categories on posts.category_id = categories.id
        where 1=1  `
        if (params.cate) {
            // 拼接分类条件
            sql += ` and posts.category_id = ${params.cate} `
        }
        if (params.statu) {
            // 拼接状态条件
            sql += ` and posts.status = '${params.status}' `
        }
        sql += ` order by posts.id desc
        limit ${(params.pagenum-1)*params.pagesize},${params.pagesize}`
        conn.query(sql, (err, results) => {
            if (err) return callback(err)
            // 重新给sql语句赋值获得总条数
            sql = `
            select count(*) sum from posts
            `
            conn.query(sql, (err1, data1) => {
                if (err1) return callback(err)
                // 获得的data1的值是一个数组
                callback(null, {
                    // 返回一个对象，需要返回查询出的数据，又要返回查询出的总记录数
                    result: results,
                    total: data1[0].sum
                })
            })
        })
    },
    delPostList(id, callback) {
        console.log(id);
        let sql = 'delete from posts where id=?'
        conn.query(sql, id, (err, result) => {
            if (err) return callback(err)
            callback(null)
        })
    }
}