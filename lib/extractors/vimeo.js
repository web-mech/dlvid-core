var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  request = require('request'),
  util = require('util'),
  fs = require('fs'),
  Url = require('url');

var Vimeo = new Class({
  inherits: Extractor,
  getId: function(url) {
    return Url.parse(url).path.split('/').slice(-1)[0];
  },
  download: function(url) {
    request(source.url);
  },
  getInfo: function(url) {
    var defer = Q.defer();
    url = util.format(this.config.endpoints.vimeo, this.getId(url));
    this.get(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        defer.resolve(JSON.parse(body));
      } else {
        defer.reject({
          error: error,
          response: response
        });
      }
    });

    return defer.promise;
  }
});

module.exports = Vimeo;