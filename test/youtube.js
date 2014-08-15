var assert = require('better-assert'),
  path = require('path'),
  fs = require('fs'),
  Stream = require('stream'),
  streamAssert = require('stream-equal'),
  YouTubeExtractor = require('../lib/extractors/youtube');

describe('youtube', function() {
  var url = 'http://www.youtube.com/watch?v=GfAnyT9QitU';
  describe('info', function() {
    it('Should get video results from a specified url', function(done) {
      var yte = new YouTubeExtractor();
      yte.info(url).done(function(info) {
        assert(arguments.length === 1);
        done();
      });
    });
  });
  describe('download', function() {
    it('Should download a file', function(done) {
      var yte = new YouTubeExtractor();
      yte.download(url).done(function(file) {
        assert(file instanceof Stream);
        done();
      });
    });
  });
});