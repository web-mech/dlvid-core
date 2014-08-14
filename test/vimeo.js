var assert = require('better-assert'),
  VimeoExtractor = require('../lib/extractors/vimeo'),
  config = require('../lib/config/config');


describe('vimeo', function() {
var url ='https://vimeo.com/channels/staffpicks/79426902';
  describe('getId', function(){
    it('Should return ids of vimeo clips',function(){
      var ve = new VimeoExtractor(config);
      var ids = ve.getId(url);
      assert(ids === '79426902');
    });
  });

  describe('getInfo', function(){
    it('Should get meta-data information about a certain clip', function(done){
      var ve = new VimeoExtractor(config);

      ve.getInfo(url).done(function(result){
        console.log(result);
        assert(result.request instanceof Object);
        assert(result.request.files instanceof Object);
        assert(typeof result.video.title === 'string');
        //assert(result.video.title === 'Jay-Z - Fuckwithmeyouknowigotit (ft. Rick Ross)');
        done();
      });
    });
  });
  /**
  describe('download', function() {
    it('Can download an mp4 for each clip', function(done) {
      var ve = VimeoExtractor.new();
      ve.download(urls).done(function(info){
          assert(true);
          done();
      });
      
    });
  });
**/
});