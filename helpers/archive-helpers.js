var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.urlArray = [];

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
    urlArray = data.toString().split('/n');
    exports.isUrlInList(url, urlArray);
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
      console.log("url found!")
    }
    else{
      fs.appendFile(exports.paths.list, url+"\n", function (err) {
        if (err){(console.log(err));};
        console.log("site appended!")
      });

    }
};

exports.addUrlToList = function(url){
  //write url to sites.txt file using fs.writeFile

};

exports.isUrlArchived = function(url){
  //should return a boolean
    //if false, call addUrlToList and pass in the url
    //if true, call downloadUrls
};

exports.downloadUrls = function(url){
  //should res.end the html file saved in the sites folder
};
