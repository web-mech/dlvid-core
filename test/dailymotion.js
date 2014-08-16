var assert = require('better-assert'),
  path = require('path'),
  fs = require('fs'),
  Stream = require('stream'),
  streamAssert = require('stream-equal'),
  DailyMotionExtractor = require('../lib/extractors/dailymotion'),
  config = require('../lib/config/config'),
  url = 'http://www.dailymotion.com/video/xb64yc_movie-countdown-google-videos-2_shortfilms';

describe('DailyMotionExtractor', function() {
  describe('getId', function() {
    it('Should return id of a dailymotion clip', function(done){
      var de = new DailyMotionExtractor(config);
      var id = de.getId(url);
      assert(id === 'xb64yc_movie-countdown-google-videos-2_shortfilms');
      done();
    });
  });

  describe('info', function() {
    it('Should get meta-data information about a certain clip', function(done) {
      var dm = new DailyMotionExtractor(config);
      dm.info(url).done(function() {
        assert(arguments.length);
        done();
      });
    });
  });

  describe('download', function() {
    it('Should download video', function(done) {
      var video = path.resolve(__dirname, 'files/dailymotion'),
        dm = new DailyMotionExtractor(config),
        vidStream = fs.createReadStream(video);

      dm.download(url).done(function(file) {
        streamAssert(vidStream, file, function(err, equals) {
          assert(equals);
          assert(file instanceof Stream);
          done();
        });
      });
    });
  });
});