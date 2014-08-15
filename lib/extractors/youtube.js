var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  ytdl = require('ytdl-core');

var YouTube = new Class({
  inherits: Extractor,
  download: function(url, options) {
    var defer = Q.defer();
    options = options || {};
    options.downloadURL = true;
    var filterFn = options.filter ? function(filter) {
      return filter.container === options.filter;
    } : function(filter) {
      return filter.container === 'mp4';
    };

    options.filter = filterFn;
    
    this.info(url, options).done(function(info) {
      defer.resolve(ytdl.downloadFromInfo(info, options));
    });
    return defer.promise;
  },
  info: function(url, options) {
    var defer = Q.defer();
    options = options || {};
    ytdl.getInfo(url, options, function(err, info) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(info);
      }
    });
    return defer.promise;
  }
});

module.exports = YouTube;