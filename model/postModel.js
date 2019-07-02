const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu',
    dateStrings: true
})

module.exports = {
    getPostList(callback) {
        let sql = `
    select posts.*,users.id,categories.id,users.nickname,categories.name from posts
inner join users on posts.user_id=users.id
inner join categories on posts.category_id=categories.id
    `
        conn.query(sql, (err, results) => {
            if (err) return callback(err)
            callback(null, results)
        })
    }
}