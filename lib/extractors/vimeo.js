var Extractor = require('./extractor'),
  Class = require('ee-class'),
  Q = require('q'),
  util = require('util');

var Vimeo = new Class({
  inherits: Extractor,
  selectFile: function(fileMap, options) {
    var codecs = Object.keys(fileMap),
      codec = options.type || 'h264';
    if(!~codecs.indexOf(codec)) {
      codec = codecs[0];
    }
    var qualities = Object.keys(fileMap[codec]),
      quality = options.quality || 'hd';
    if(!~qualities.indexOf(quality)) {
      quality = qualities[0];
    }
    return {codec: codec, quality: quality};
  },
  download: function(url, options) {
    var defer = Q.defer();
    options = options || {};
    this.info(url).done(function(data){
      var files = data.request.files,
        fileInfo = this.selectFile(files, options),
        file = files[fileInfo.codec][fileInfo.quality],
        req = this.get(file.url);
      defer.resolve(req);
    }.bind(this));
    return defer.promise;
  },
  info: function(url) {
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