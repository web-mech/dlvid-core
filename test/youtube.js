var assert = require('better-assert'),
  YouTubeExtractor = require('../lib/extractors/youtube');

describe('youtube', function() {
  describe('getInfo', function() {
    it('Should get video results from a specified url', function(done) {
      var yte = new YouTubeExtractor(),
        url = 'http://www.youtube.com/watch?v=OwI1ZKCuOww';
      yte.getInfo(url).done(function() {
        assert(arguments.length === 1);
        done();
      });
    });
  });
});