var assert = require('better-assert');
var Extractor = require('../lib/extractors/extractor');

describe('Extractor',function(){
  describe('get', function(){
    it('Should get data from a url', function(done){
      var extractor = new Extractor(),
       stream = extractor.get('http://google.com');
      
      stream.on('end',function(){
        assert(arguments.length);
        done();
      });
    });
  });
});