var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  xmlParser = require('xml2js').parseString,
  util = require('util');

var Veoh = new Class({
  inherits: Extractor,
  selectQuality: function(quality) {
    switch (quality) {
      case 'sd':
        return 'fullPreviewHashLowPath';
      case 'hd':
        return 'fullPreviewHashHighPath';
    }
  },
  download: function(url, options) {
    var defer = Q.defer();
    options = options || {};
    options.quality = options.quality || 'hd';
    this.info(url).done(function(info) {
      info = info.rsp.videoList[0].video[0]['$'];
      var quality = this.selectQuality(options.quality);
      defer.resolve(this.get(info[quality]));
    }.bind(this));
    return defer.promise;
  },
  parse: function(data, deferred) {
    xmlParser(data, function(err, result) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(result);
    });
  },
  info: function(url) {
    var defer = Q.defer();
    url = util.format(this.config.endpoints.veoh, this.getId(url));
    this.get(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        this.parse(body, defer);

      } else {
        defer.reject(error);
      }
    }.bind(this));
    return defer.promise;
  }
});

module.exports = Veoh;