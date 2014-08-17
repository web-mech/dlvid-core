var assert = require('better-assert'),
  path = require('path'),
  fs = require('fs'),
  Stream = require('stream'),
  streamAssert = require('stream-equal'),
  YahooExtractor = require('../lib/extractors/yahoo'),
  config = require('../lib/config/config'),
  url = 'https://screen.yahoo.com/awesome-animals/dog-baby-horse-friends-life-140452229.html';


describe('YahooExtractor', function() {
  describe('getId', function() {
    it('Should grab the video id from the page returned by the url', function(done) {
      var ye = new YahooExtractor(config);
      ye.getId(url).done(function(id) {
        assert(id === '1ef0471d-231d-346e-bd12-2849c24a3097');
        done();
      });
    });
  });

  describe('info', function() {
    it('Should grab data from the yahoo screen api', function(done) {
      var ye = new YahooExtractor(config);
      ye.info(url).done(function(info) {
        assert(info instanceof Object && info.hasOwnProperty('query'));
        assert(info.query.hasOwnProperty('results'));
        assert(info.query.results.hasOwnProperty('mediaObj') && info.query.results.mediaObj instanceof Object);
        done();
      });
    });
  });

  describe('download', function() {
    it('Should grab download a movie file given a valid Yahoo screen url', function(done) {
      var ye = new YahooExtractor(config);
      ye.download(url).done(function(file) {
        assert(file instanceof Stream);
        done();
      });
    });
  });
});