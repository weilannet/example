"use strict";

// 加载express模块
const express = require('express');
const router = require('./router');
const path = require('path');
const config = require('./config'); // 一般我们都把配置文件放在网站根目录,里面放一些变化的东西
const bodyParser = require('body-parser'); // 这是一个第三方的处理post请求体的中间件

// 调用express() 得到一个 app 实例
const app = express();

// 一般，对于一个规范的项目来说，模板文件就放在views目录下,注意：第一个参数views不能改变，否则设置无效
app.set('views',path.join(__dirname,'views'));
// 设置使用 ejs 模板引擎，注意：第一个参数 view engine 不要改变，否则设置无效
app.set('view engine','ejs');

// 设置静态资源处理中间件，注意，第一个参数表示虚拟路径，第二个参数表示要设置哪个目录默认作为静态资源存储位置
app.use('/www',express.static('www')); // /www/img/1.jpg
app.use(express.static('root')); // /北京之行/2.jpg

// 配置解析post请求体的中间件，该中间件叫 body-parser ，可以在npm上搜索到，需要安装 npm install body-parser
// 当它解析完毕之后，就可以直接通过req.body 获取post请求体中的参数
app.use(bodyParser.urlencoded({ extended: false }));

// 给app.locals挂载一个属性，config,方便我们在后面的处理中直接通过 req.app.locals.rootDir来使用
app.use(function (req,res,next) {
  app.locals.rootDir = config.rootDir;
  
  next();
});

// 挂载路由中间件
app.use(router);

// 挂载错误处理中间件, 一般把这个错误处理中间件，放在中间件最后的位置，这个叫做全局错误处理中间件
// 程序的错误，一般来说要把该错误信息记录到日志中（文件或者数据库都行）
if (config.debug) {
  app.use(function (err, req, res, next) {
    res.send(`糟了，出错了：${err.message}`); // 为了开发方便
  });
}else{
  app.use(function (err, req, res, next) {
    // 把错误信息写入到文件或者数据库中，持久化保存用来追踪错误信息
  });
}


// 不要把用户的具体的业务逻辑写到这个页面中，当前入口模块，一般用来作一些配置设置（针对于应用程序的）

app.listen(3000,'localhost', function () {
  console.log('server is running at port 3000');
});
