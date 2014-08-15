var assert = require('better-assert'),
  path = require('path'),
  fs = require('fs'),
  streamAssert = require('stream-equal'),
  VimeoExtractor = require('../lib/extractors/vimeo'),
  config = require('../lib/config/config');

describe('vimeo', function() {
  var url = 'https://vimeo.com/50872925';
  describe('getId', function() {
    it('Should return ids of vimeo clips', function() {
      var ve = new VimeoExtractor(config);
      var ids = ve.getId(url);
      assert(ids === '50872925');
    });
  });

  describe('getInfo', function() {
    it('Should get meta-data information about a certain clip', function(done) {
      var ve = new VimeoExtractor(config);
      ve.getInfo(url).done(function(result) {
        assert(result.request instanceof Object);
        assert(result.request.files instanceof Object);
        assert(typeof result.video.title === 'string');
        done();
      });
    });
  });

  describe('selectFiles', function() {
    it('Can select a file type with no options passed', function(done) {
      var ve = new VimeoExtractor(config);
      ve.getInfo(url).done(function(data) {
        var files = data.request.files,
          fileInfo = ve.selectFile(files, {});
        assert(fileInfo.codec === 'h264');
        assert(fileInfo.quality === 'sd');
        done();
      });
    });

    it('Will fall back to what is available when an invalid filter is passed', function(done) {
      var ve = new VimeoExtractor(config);
      ve.getInfo(url).done(function(data) {
        var files = data.request.files,
          fileInfo = ve.selectFile(files, {
            type: 'vp8',
            quality: 'hd'
          });
        assert(fileInfo.codec === 'h264');
        assert(fileInfo.quality === 'sd');
        done();
      });
    });
  });

  describe('download', function() {
    it('Will download a file from vimeo', function(done) {
      var video = path.resolve(__dirname, 'files/vimeo'),
        ve = new VimeoExtractor(config),
        vidStream = fs.createReadStream(video);
      ve.download(url).done(function(file) {
        streamAssert(vidStream, file, function(err, equals) {
          assert(equals);
          done();
        });
      });
    });
  });
});