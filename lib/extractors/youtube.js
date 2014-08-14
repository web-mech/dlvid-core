var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  ytdl = require('ytdl-core');

var YouTube = new Class({
  inherits: Extractor,
  get: function(url) {
    var deferred = Q.defer();
    ytdl.getInfo(url, function(err, info) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(info);
      }
    });
    return deferred.promise;
  },
  _download: function(url, filter) {
    var stream = ytdl(url);
    var deferred = Q.defer();
    stream.on('info', function(info, format) {
      deferred.resolve({
        info: info,
        format: format
      });
    });
    return deferred.promise;
  },
  download: function(urls, filter) {
    urls = this.normalize(urls);
    return Q.allSettled(urls.map(this._download));
  },
  getInfo: function(url) {
    return this.get(url);
  }
});

module.exports = YouTube;