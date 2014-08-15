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
  /**
   * Parts of the response to look at in order to parse
   * @type {Object}
   */
  placeholders: {
    start: 'var info =',
    stop: '"parent.screenname":null}' //this looks suspect. may break.
  },
  _download: function(response) {
    var url = Url.parse(response.request.uri.href);
    var request = {
      url: url.href,
      followAllRedirects: true,
      headers: {
        'Host': url.host
      }
    };
    var req = this.get(request);
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
  /**
   * @todo This is a horrible extractor for DM. Need to find a better way to parse the data. Seems to work for now.
   */
  info: function(url, options) {
    var defer = Q.defer();
    url = util.format(this.config.endpoints.dailymotion, this.getId(url));
    this.get(url, function(error, response, body) {
      body = body.replace(/\\/g, '');
      var start = this.placeholders.start,
        stop = this.placeholders.stop;
      var indexes = {
        start: body.indexOf(start) + start.length,
        stop: body.indexOf(stop) + stop.length
      };
      var info = body.substr(indexes.start, (indexes.stop - indexes.start));
      info = JSON.parse(info);
      defer.resolve(info);
    }.bind(this));
    return defer.promise;
  }
});

module.exports = DailyMotion;