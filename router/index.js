const express = require('express')
//引入静态页面控制器模块
const controllerPage = require('../controllers/controllerPage')
const getController = require('../controllers/getController')
const cateController = require('../controllers/cateController')
// 创建路由实例
const router = express.Router()
// 创建路由句柄
router.get('/', controllerPage.showIndexPage)
    //前台静态页面渲染
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

    // 后台管理页面动态加载
    .get('/getPostList', getController.getPostList)
    .get('/delPostList', getController.delPostList)


    //页面所有分类
    .get('/getAllCateList', cateController.getAllCateList)


// 向外暴露数据
module.exports = router