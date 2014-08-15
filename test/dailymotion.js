var assert = require('better-assert'),
  path = require('path'),
  fs = require('fs'),
  Stream = require('stream'),
  streamAssert = require('stream-equal'),
  DailyMotionExtractor = require('../lib/extractors/dailymotion'),
  config = require('../lib/config/config');
var url = 'http://www.dailymotion.com/video/xb64yc_movie-countdown-google-videos-2_shortfilms';

  describe('DailyMotionExtractor', function(){
    it('Should download video information', function(done){
      var dm = new DailyMotionExtractor(config);
      dm.info(url).done(function(){
        assert(arguments.length);
        done();
      });
    });

    it('Should download video', function(done){
      var dm = new DailyMotionExtractor(config);
      dm.download(url).done(function(file){
        assert(file instanceof Stream);
        done();
      });
    });
  });