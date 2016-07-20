"use strict";

const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

module.exports = function (req, res, next) {
  let pathname = url.parse(req.url).pathname;
  if (pathname.startsWith('/www/')) {
    // /www/img/1.jpg
    // ./www/img/1.jpg
    let fullPath = '.' + req.url;
    fs.readFile(fullPath, function (err, data) {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain; charset=utf-8'
        });
        return res.end('对不起，您所请求的资源找不到了。。^_^');
      }
      let mimeType = mime.lookup(fullPath);

      if (mimeType.startsWith('text/')) {
        mimeType += '; charset=utf-8';
      }
      res.writeHead(200, {
        'Content-Type': mimeType
      });
      res.end(data);
    });
  } else {
    next();
  }
};

// 我们需要静态资源路径是可配置的

// staticPath 支持两种参数方式，一种是绝对路径、一种是名字（这个名字就是当前网站根路径下的一个目录名称）
// www
// /www/vender/jquery/dist/jquery.js
// /www/vender/artTemplate/dist/template.js
// /www/img/1.jpg

// 一般来说，我们统一规定，将静态资源放到一个单独的目录中，专门存储静态资源
// 一般也就是css、js、img、第三方库

//# sourceMappingURL=static-serve-compiled.js.map