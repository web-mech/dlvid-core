var Class = require('ee-class'),
  request = require('request'),
  Url = require('url');

var Extractor = new Class({
  getId: function(url) {
    return Url.parse(url).path.split('/').slice(-1)[0];
  },
  init:function(config){
    this.config = config || {};
  },
  get: function(url, cb){
    return request(url, cb || function(){});
  }
});

module.exports = Extractor;