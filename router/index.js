const express = require('express')
const controllerPage = require('../controllers/controllerPage')

const router = express.Router()

router.get('/', controllerPage.showIndexPage)
    .get('/detail', controllerPage.showDetailPage)
    .get('/list', controllerPage.showListPage)



    //后台管理页面，统一添加admin作为前缀
    .get('/admin', controllerPage.getAdminPage)
    .get('/admin/login', controllerPage.getAdminLoginPage)
    .get('/admin/categories', controllerPage.AdminCategoriesPage)
    .get('/admin/comments', controllerPage.AdminCommentsPage)
    .get('/admin/nav-menus', controllerPage.AdminNavmenusPage)
    .get('/admin/password-reset', controllerPage.AdminPasswordPage)
    .get('/admin/post-add', controllerPage.AdminPostAddPage)
    .get('/admin/posts', controllerPage.AdminPostsPage)
    .get('/admin/profile', controllerPage.AdminProfilePage)
    .get('/admin/settings', controllerPage.AdminSettingsPage)
    .get('/admin/slides', controllerPage.AdminSlidesPage)
    .get('/admin/users', controllerPage.AdminUsersPage)






module.exports = router