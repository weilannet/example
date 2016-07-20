"use strict";

const fs = require('fs');
const _ = require('underscore');

const musicList = [{
  id: '1',
  name: '演员',
  singer: '薛之谦',
  isHightRate: true
}, {
  id: '2',
  name: '丑八怪',
  singer: '薛之谦',
  isHightRate: false
}, {
  id: '3',
  name: 'Fade',
  singer: 'Alan Walker',
  isHightRate: true
}, {
  id: '4',
  name: '想着你的感觉',
  singer: '容祖儿',
  isHightRate: true
}, {
  id: '5',
  name: '叽咕叽咕',
  singer: '徐佳莹',
  isHightRate: false
}];

// showIndex  showAdd showEdit
// 读取文件，模板编译、注入数据

// res.render('index',{})

exports.showIndex = function (req, res) {
  res.render('index', {
    title: '首页'
  });
};

exports.getMusicList = function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });

  res.end(JSON.stringify({
    musicList: musicList
  }));
};

exports.showAdd = function (req, res) {
  fs.readFile('./add.html', 'utf8', function (err, data) {
    if (err) {
      return res.end(err.message);
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    res.end(data);
  });
};

exports.doAdd = function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let singer = req.body.singer;
  let isHightRate = req.body.isHightRate;

  let musicInfo = musicList.find(m => m.id === id);

  if (musicInfo) {
    return res.end('music is already exists');
  }

  isHightRate = isHightRate === '1' ? true : false;

  musicList.push({
    id,
    name,
    singer,
    isHightRate
  });

  res.writeHead(302, {
    'Location': 'http://127.0.0.1:3000/'
  });

  res.end();
};

exports.doRemove = function (req, res) {
  let index = musicList.findIndex(m => m.id === req.params.mid);
  try {
    musicList.splice(index, 1);
    res.end(JSON.stringify({
      code: '1',
      msg: 'ok'
    }));
  } catch (e) {
    res.end(JSON.stringify({
      code: '0',
      msg: e.message
    }));
  }
};

exports.showEdit = function (req, res) {
  // 根据音乐信息id找到该项
  let musicInfo = musicList.find(m => m.id === req.params.mid);

  // 如果用户要编辑的
  if (!musicInfo) {
    return res.end('music is not exists');
  }
  res.render('edit', { musicInfo: musicInfo });
};

exports.doEdit = function (req, res) {
  let name = req.body.name;
  let singer = req.body.singer;
  let isHightRate = req.body.isHightRate;

  // 你要编辑谁？
  // 根据id查找数组中的索引
  let index = musicList.findIndex(m => m.id === req.params.mid);

  musicList[index].name = name;
  musicList[index].singer = singer;
  musicList[index].isHightRate = isHightRate === '1' ? true : false;

  // 修改完之后，直接跳转到首页
  // 301 重定向   永久重定向
  // 302 重定向   临时重定向

  res.writeHead(302, {
    'Location': 'http://127.0.0.1:3000/'
  });

  // 记住，哪怕只写了响应头，也一定要end
  res.end();
};

//# sourceMappingURL=handler-compiled.js.map