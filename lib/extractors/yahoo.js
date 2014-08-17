var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  util = require('util'),
  Url = require('url');

var Yahoo = new Class({
  inherits: Extractor,
  download: function(url) {
    var defer = Q.defer();
    this.info(url).done(function(info) {
      var streams = info.query.results.mediaObj[0].streams,
        stream = streams[0],
        uri = Url.resolve(stream.host, stream.path);

      var req = this.get(uri);

      defer.resolve(req);
    }.bind(this));
    return defer.promise;
  },
  getId: function(url) {
    var defer = Q.defer();
    this.get(url, function(err, response, body) {
      var id = body.match(/root\.App\.Cache\.context\.videoCache\.curVideo = \{"([^"]+)"/)[1];
      if (id) {
        defer.resolve(id);
      } else {
        defer.reject(new Error('Could not extract yahoo Id'));
      }
    });
    return defer.promise;
  },
  info: function(url) {
    var defer = Q.defer();
    var query = [];
    this.getId(url).done(function(id) {
      query.push(util.format('SELECT * FROM yahoo.media.video.streams WHERE id="%s"', id));
      query.push('AND plrs="86Gj0vCaSzV_Iuf6hNylf2" AND region="US"');
      query.push('AND protocol="http"');
      query = encodeURI(query.join(' '));
      var uri = util.format(this.config.endpoints.yahoo, query);
      this.get(uri, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          defer.resolve(JSON.parse(body));
        } else {
          defer.reject({
            error: error,
            response: response
          });
        }
      });

    }.bind(this));
    return defer.promise;
  }
});

module.exports = Yahoo;