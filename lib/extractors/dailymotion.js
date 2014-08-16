var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  util = require('util'),
  Url = require('url');

var DailyMotion = new Class({
  /**
   * [inherits description]
   * @type {[type]}
   */
  inherits: Extractor,
  _download: function(response) {
    var url = Url.parse(response.request.uri.href),
      request = {
        url: url.href,
        followAllRedirects: true,
        headers: {
          'Host': url.host
        }
      },
      req = this.get(request);
    return req;
  },
  download: function(url, options) {
    var defer = Q.defer();
    options = options || {};
    this.info(url).done(function(info) {
      this.get(info.stream_h264_url).on('response', function(response) {
        defer.resolve(this._download(response));
      }.bind(this));
    }.bind(this));
    return defer.promise;
  },
  info: function(url, options) {
    var defer = Q.defer();
    url = util.format(this.config.endpoints.dailymotion, this.getId(url));
    this.get(url, function(error, response, body) {
      body = body.replace(/\\/g, '');
      var info = body.match(/var info = ({.*?}),$/gmi)[0].replace(/var info = /, '').trim().slice(0, -1);
      info = JSON.parse(info);
      defer.resolve(info);
    }.bind(this));
    return defer.promise;
  }
});

module.exports = DailyMotion;