var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === "GET") {
    httpHelp.serveAssets(res, req.url);
  }
  if(req.method === "POST") {
    console.log("post request received");
    var body = "";
    req.on("data", function(data) {
      body += data;
    });
    req.on('end', function() {
     // var stringBody = JSON.stringify(body);
     var url = JSON.stringify(body).slice(5, JSON.stringify(body).length -1);
      archive.readListOfUrls(url);
    });
  }


  // res.end(archive.paths.list);
};
