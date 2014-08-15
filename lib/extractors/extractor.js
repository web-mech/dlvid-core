var Class = require('ee-class'),
  request = require('request'),
  Q = require('q')

var Extractor = new Class({
  init:function(config){
    this.config = config || {};
  },
  normalize: function(urls){
    if (!(urls instanceof Array)) {
      urls = [urls];
    }
    return urls;
  },
  get: function(url, cb){
    return request(url, cb || function(){});
  }
});

module.exports = Extractor;