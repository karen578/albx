const express = require('express')
//引入静态页面控制器模块
const controllerPage = require('../controllers/controllerPage')
const getController = require('../controllers/getController')
const cateController = require('../controllers/cateController')
const uploadController = require('../controllers/uploadController')
const userController = require('../controllers/userController')
const commentController = require('../controllers/commentController')
const menusController = require('../controllers/menusController')
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
    //新增文章数据
    .post('/addPost', getController.addPost)
    .get('/getPostById', getController.getPostById)
    //编辑文章
    .post('/editPost', getController.editPost)


    //页面所有分类
    .get('/getAllCateList', cateController.getAllCateList)
    //根据id获取分类
    .get('/getcateById', cateController.getcateById)
    //根据id删除分类
    .get('/delcateById', cateController.delcateById)
    //编辑分类
    .post('/editcateById', cateController.editcateById)
    //增加分类
    .post('/Addcate', cateController.Addcate)

    //上传文件
    .post('/uploadFile', uploadController.uploadFile)


    //登录页面
    .post('/login', userController.login)

    //获取评论页面
    .get('/getCommentList', commentController.getCommentList)


    //添加菜单
    .post('/addmenus', menusController.addmenus)
    .get('/getmenus', menusController.getmenus)
    //查询尾页数据
    .get('/getOptions', menusController.getOptions)
    //更新尾页
    .post('/updateOptions', menusController.updateOptions)
    //获取用户信息
    .get('/getUsers', userController.getUsers)
    //删除用户信息
    .get('/delUser', userController.delUser)
    //添加用户信息
    .post('/addUsers', userController.addUsers)
    //根据id查找用户
    .get('/getUserById', userController.getUserById)
    //编辑用户
    .post('/editUsers', userController.editUsers)


// 向外暴露数据
module.exports = router