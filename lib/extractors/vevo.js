var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  util = require('util'),
  async = require('async'),
  xmlParser = require('xml2js').parseString,
  Url = require('url');

var Vevo = new Class({
  inherits: Extractor,
  download: function(url, options) {
    var defer = Q.defer();
    options = options || {};
    options.quality = options.quality || 'High';
    this.info(url).done(function(info) {
      var file = this.selectSource(info.videos, options);
      var req = this.get(file.url);
      defer.resolve(req);
    }.bind(this));
    return defer.promise;
  },
  _parseXml: function(data) {
    var defer = Q.defer();
    async.map(data, xmlParser, function(err, videos) {
      videos = videos.reduce(function(videos, video) {
        if (video) {
          var vids = video.renditions.rendition.reduce(function(renditions, rendition) {
            if (/h264-lvl3/.test(rendition.$.url)) {
              renditions.push(rendition.$);
            }
            return renditions;
          }, []);
          videos = videos.concat(vids);
        }
        return videos;
      }, []);
      defer.resolve(videos);
    });
    return defer.promise;
  },
  parse: function(info) {
    var defer = Q.defer();
    var videos = info.videoVersions.map(function(video) {
      return video.data;
    });
    this._parseXml(videos).done(function(videos) {
      info.videos = videos;
      defer.resolve(info);
    });
    return defer.promise;
  },
  selectSource: function(data, filter) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === filter.quality) {
        return data[i];
      }
    }
  },
  info: function(url) {
    var defer = Q.defer(),
      url = util.format(this.config.endpoints.vevo, this.getId(url));

    url = Url.parse(url);
    var request = {
      url: url.href,
      followAllRedirects: true,
      headers: {
        'Host': url.host,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.8',
        'User-Agent': 'User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.76 Safari/537.36'
      }
    };
    this.get(request, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var info = (JSON.parse(body)).video;
        this.parse(info).done(function(d) {
          defer.resolve(d);
        });
      } else {
        defer.reject({
          error: error,
          response: response
        });
      }
    }.bind(this));
    return defer.promise;
  }
});

module.exports = Vevo;