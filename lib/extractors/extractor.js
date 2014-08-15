var Class = require('ee-class'),
  request = require('request');

var Extractor = new Class({
  init:function(config){
    this.config = config || {};
  },
  get: function(url, cb){
    return request(url, cb || function(){});
  }
});

module.exports = Extractor;