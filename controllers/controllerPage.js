module.exports = {
    showIndexPage(req, res) {
        res.render('index')
    },
    showDetailPage(req, res) {
        res.render('detail')
    },
    showListPage(req, res) {
        res.render('list')
    },
    //后台页面效果渲染
    getAdminPage(req, res) {
        res.render('admin/index.ejs')
    },
    getAdminLoginPage(req, res) {
        res.render('admin/login.ejs')
    },
    AdminCategoriesPage(req, res) {
        res.render('admin/categories.ejs')
    },
    AdminCommentsPage(req, res) {
        res.render('admin/comments.ejs')
    },
    AdminNavmenusPage(req, res) {
        res.render('admin/nav-menus.ejs')
    },
    AdminPasswordPage(req, res) {
        res.render('admin/password-reset.ejs')
    },
    AdminPostAddPage(req, res) {
        res.render('admin/post-add.ejs')
    },
    AdminPostsPage(req, res) {
        res.render('admin/posts.ejs')
    },
    AdminProfilePage(req, res) {
        res.render('admin/profile.ejs')
    },
    AdminSettingsPage(req, res) {
        res.render('admin/settings.ejs')
    },
    AdminSlidesPage(req, res) {
        res.render('admin/slides.ejs')
    },
    AdminUsersPage(req, res) {
        res.render('admin/users.ejs')
    }
}