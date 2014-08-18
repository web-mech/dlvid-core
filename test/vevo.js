var assert = require('better-assert'),
  path = require('path'),
  fs = require('fs'),
  Stream = require('stream'),
  streamAssert = require('stream-equal'),
  VevoExtractor = require('../lib/extractors/vevo'),
  config = require('../lib/config/config'),
  url = 'http://www.vevo.com/watch/USCMV1100094';

describe('VevoExtractor', function() {
  describe('getId', function() {
    it('Should return the id of a vevo clip', function() {
      var ve = new VevoExtractor(config),
        id = ve.getId(url);
      assert(id === 'USCMV1100094');
    });
  });

  describe('parse', function() {
    it('Should convert xml data into an object that contains a valid url', function(done) {
      var ve = new VevoExtractor(config);
      ve.info(url).done(function(data) {
        assert(/[mp4]/.test(data.videos[0].url));
        done();
      });
    });
  });

  describe('info', function() {
    it('Should get meta-data information about a certain clip', function(done) {
      var ve = new VevoExtractor(config);
      ve.info(url).done(function(data) {
        assert(data instanceof Object);
        done();
      });
    });
  });

  describe('download', function() {
    it('Should download a file from vevo', function(done) {
      var ve = new VevoExtractor(config);
      ve.download(url, {
        quality: 'Low'
      }).done(function(file) {
        assert(file instanceof Stream);
        done();
      });
    });
  });
});