"use strict";

const http = require('http');
const url = require('url');
const router = require('./router');

const render = require('./common/render');
const staticServe = require('./common/static-serve');
const bodyParser = require('./common/body-parser');

/*
 * 一般来说，对于每一个请求来说，他们有一些公共的需求，
 * 而这些公共的需求，就是常用的：获取get请求参数，获取post请求参数
 *
 * 经过我们的封装完毕之后：
 *  我们想通过  req.query 来获取get请求参数对象
 *  通过 req.body  获取post请求提交的请求体参数对象
 * */

const server = http.createServer((req, res) => {

  // 进入 router 方法之前，给request对象挂载一些东西

  // 直接给request对象挂载一个query属性
  req.query = url.parse(req.url, true).query;

  // 给res对象挂载一个render方法，参数为：模板的名称，要注入的数据
  render(res);

  // 优先处理静态资源，如果没有匹配到静态资源，那就处理自己的业务
  staticServe(req, res, function () {
    // 在 request 挂载一个 req.body
    bodyParser(req, function () {
      // 正式进入自己的路由请求处理判断之前
      // 我们给req 扩充了一个 query、body
      // 给 res 对象 扩充了一个 render

      router(req, res);
    });
  });
});

server.listen(3000, '127.0.0.1', function () {
  console.log('server is listening ar port 3000');
});

//# sourceMappingURL=index-compiled.js.map