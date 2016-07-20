"use strict";

require('http').createServer(function (req, res) {
  console.log(req.headers);
}).listen(3000);
