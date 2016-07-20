"use strict";

const fs = require('fs');
const util = require('util');
const path = require('path');
const formidable = require('formidable');

exports.showAlbum = function (req, res, next) {
  let albumName = req.params.albumName;

  let rootDir = req.app.locals.rootDir;

  let fullPath = path.join(rootDir, albumName);

  fs.readdir(fullPath, function (err, files) {
    if (err) {
      return next(err);
    }
    let srcs = [];
    files.forEach(function (item) {
      if (fs.statSync(path.join(fullPath, item)).isFile()) {
        srcs.push(`/${albumName}/${item}`);
      }
    });
    res.render('album', {
      srcs: srcs,
      title:albumName,
      uploadUrl:`/album/${albumName}`
    });
  });
};

exports.uploadImage = function (req, res, next) {

  // 获取具体要上传到哪个目录
  let albumName = req.params.albumName;

  // 从全局配置信息中所有相册的根目录
  let rootDir = req.app.locals.rootDir;

  
  let fullPath = path.join(rootDir,albumName);

  //res.send(fullPath);
  
  // 因为自己处理文件上传很麻烦，要判断很多的东西
  let form = new formidable.IncomingForm();

  // 这个第三方包把文件暂时的放到了临时目录中
  // 图片本身也是文件，一般如果只想接收图片类型，那么要在这里进行后缀名判断
  form.parse(req, function(err, fields, files) {
    if (err) {
      return next(err);
    }
    
    let pic = files.pic;
    
    // 获取上传的文件大小
    let size = pic.size;
       

    if(size>1024*1024){
      return res.send('亲，文件太大了，不允许上传');
    }
    
    // formidable 包，默认帮我们把用户上传的图片暂时放在了一个临时目录中，没有后缀
    let tempPath = pic.path;
    let extName = path.extname(pic.name);

    // if(!['.jpg','.png','.gif'].includes(extName)){
    //   return res.send('亲，只接收图片');
    // }
    
    // 拼接自己的具体要保存的业务路径
    let distPath = path.join(fullPath,+new Date()+'')+extName;
    
    //fs.renameSync(files.upload.path, "/tmp/test.png");
    //fs.rename报错，改用以下方案
    var readStream = fs.createReadStream(tempPath)
    var writeStream = fs.createWriteStream(distPath);

    util.pump(readStream, writeStream, function(err) {
      fs.unlinkSync(tempPath);
         if (err) {
              return next(err);
         }
      // 如果用户上传文件成功，直接刷新当前页面，redirect本身就是就是302状态码
      // 注意：ajax不能这么干，ajax只能接收单纯的数据，ajax一般是根据返回的数据在前台作判断
      // 然后在前台做业务逻辑处理，window.location.reload(); window.location.href = '';
      res.redirect('back');
    });
    
    
    // // 将临时目录中的文件移动到自己的业务路径中
    // fs.rename(tempPath,distPath, function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   // 如果用户上传文件成功，直接刷新当前页面，redirect本身就是就是302状态码
    //   // 注意：ajax不能这么干，ajax只能接收单纯的数据，ajax一般是根据返回的数据在前台作判断
    //   // 然后在前台做业务逻辑处理，window.location.reload(); window.location.href = '';
    //   res.redirect('back');
    // });
    
    
  });
};
