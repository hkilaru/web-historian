var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if(asset === "/") {asset = "/index.html"};
    fs.readFile('./public' + asset, "utf-8", function sendBack(err, data) { // data is the contents of the file
      if(err) {
        console.log(err)
      }
      res.writeHeader(200, {'Content-Type': 'text/html'})
      res.end(data);
    })

};



// As you progress, keep thinking about what helper functions you can put here!
