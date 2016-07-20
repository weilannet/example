"use strict";

/*
 * 对于当前的router文件来说，它做的工作就是：
 *  匹配用户请求的url，然后分发具体的处理函数
 * */

const express = require('express');

// 一般来说，我们把具体的处理函数都在一个叫做controller的目录中
// 按照业务来划分模块的
const indexController = require('./controller/index');
const albumController = require('./controller/album');
const userController = require('./controller/user');

// router 就可以用来组织路由，对每一个具体的请求分发到具体的响应函数
const router = express.Router();

router.get('/', indexController.showIndex);
router.get('/:albumName', albumController.showAlbum);

// /album/北京之行
// /album/野兽
router.post('/album/:albumName', albumController.uploadImage);

// 把router暴露给 外面的 app，然后在app.js文件中，可以直接 app.use(router)
module.exports = router;
