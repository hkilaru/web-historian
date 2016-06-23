var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.urlListArray = [];
exports.urlArchiveObj = {};


exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// fs.append to write to the text file
exports.readListOfUrls = function(url){
  fs.readFile('../archives/sites.txt', "utf-8", function (err, data) { // data is the contents of the file
    if(err) {
      console.log(err)
    }
    exports.urlListArray = data.toString().split('\n');
    // exports.isUrlInList(url, exports.urlListArray);
  });
  fs.readFile('../archives/sites/', "utf-8", function (err, data) { // data is the contents of the file
    if(err) {
      console.log(err)
    }
    console.log("sites folder", data);
  });
};

exports.isUrlInList = function(url, array){
  //should check sites.txt line by line and see if it's in the file
  //should return a boolean
    //if true, need to somehow wait for url to be archived
    //if false, check isUrlArchived
    var urlFound = false;
    for(var i = 0; i < array.length; i++) {
      if(array[i] === url) {
        urlFound = true;
      }
    }
    if(urlFound) {
      exports.isUrlArchived(url);
    }
    else{
      exports.isUrlArchived(url);
    }
};

exports.addUrlToList = function(url){
  //write url to sites.txt file using fs.writeFile
  fs.appendFile(exports.paths.list, url+"\n", function (err) {
        if (err){(console.log(err));};
        console.log("site appended!")
  });

};

exports.isUrlArchived = function(url){
  var archived = false;
  if(url in exports.urlArchiveObj) { // check if url is in directory
    console.log("checking if URL is archived");
     res.end(exports.paths.archivedSites + "/" + url);
  }
  else {
    // exports.addUrlToList(url);
    console.log(exports.urlArchiveObj);
    console.log("URL not found in archive;");
  }
    //if false, call addUrlToList and pass in the url
    //if true, call downloadUrls
};

exports.downloadUrls = function(urlArray){
  console.log("urlArray received", urlArray);
  var i = 0;
  function getHTML(url, index) {
     if(index < urlArray.length) {
        console.log("urlArray in loop", urlArray[i]);
        var url = urlArray[i];
        http.get(url, function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
          var html = res.buffer.toString();
          console.log("url passed into route", url);
          fs.writeFile(exports.paths.archivedSites + "/" + url, html, function(err) {
            if(err) {
              return console.log(err);
            }
            exports.urlArchiveObj[urlArray[i]] = true;
          });
        });
    i++;
    getHTML(urlArray[i], i);
    }
  }
  getHTML(urlArray[i], i);
};
