var Class = require('ee-class'),
  request = require('request'),
  Url = require('url');

var Extractor = new Class({
  init:function(config){
    this.config = config || {};
  },
  getId: function(url) {
    return Url.parse(url).path.split('/').slice(-1)[0];
  },
  get: function(url, cb){
    return request(url, cb || function(){});
  }
});

module.exports = Extractor;