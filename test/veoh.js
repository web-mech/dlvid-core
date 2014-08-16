var assert = require('better-assert'),
  path = require('path'),
  fs = require('fs'),
  Stream = require('stream'),
  streamAssert = require('stream-equal'),
  VeohExtractor = require('../lib/extractors/veoh'),
  config = require('../lib/config/config'),
  url = 'http://www.veoh.com/watch/v31498313WdzjfXJ3';


describe('VeohExtractor', function() {
  describe('getId', function() {
    it('Should return id of a veoh clip', function() {
      var ve = new VeohExtractor(config);
      var id = ve.getId(url);
      assert(id === 'v31498313WdzjfXJ3');
    });
  });
  describe('info', function() {
    it('Should get meta-data information about a certain clip', function(done) {
      var ve = new VeohExtractor(config);
      ve.info(url).done(function(info) {
        assert(info.rsp.videoList instanceof Array);
        done();
      });
    });
  });
  describe('download', function() {
    it('Should download a file from veoh', function(done) {
      var video = path.resolve(__dirname, 'files/veoh'),
        ve = new VeohExtractor(config),
        vidStream = fs.createReadStream(video);

      ve.download(url).done(function(file) {
        streamAssert(vidStream, file, function(err, equals) {
          assert(equals);
          assert(file instanceof Stream);
          done();
        });
      });
    });
  });
});