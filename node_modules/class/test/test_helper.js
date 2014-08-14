if (typeof require === 'function'){
  var Class  = require('../class.js');
  var expect = require('expect.js');
  var i = require('object-inspect');
}

var isPrototypeOf = Object.prototype.isPrototypeOf || function(object) {
  function constructor() {}
  constructor.prototype = this;
  return object instanceof constructor;
};


expect.Assertion.prototype.aClass = function(){
  this.assert(
    isPrototypeOf.call(Class.prototype, this.obj) &&
    isPrototypeOf.call(Class.prototype.prototype, this.obj.prototype),
    function(){ return 'expected ' + i(this.obj) + ' to be a class'},
    function(){ return 'expected ' + i(this.obj) + ' to not be a class'}
  );
  return this;
};

expect.Assertion.prototype.aSubclassOf = function(superclass){
  this.assert(
    isPrototypeOf.call(superclass, this.obj) &&
    isPrototypeOf.call(superclass.prototype, this.obj.prototype),
    function(){ return 'expected ' + i(this.obj) + ' to be a subclass of ' + i(superclass) },
    function(){ return 'expected ' + i(this.obj) + ' to not be a subclass of ' + i(superclass) }
  );
  return this;
};

expect.Assertion.prototype.anInstanceOf = function(_class){
  this.assert(
    isPrototypeOf.call(_class.prototype, this.obj),
    function(){ return 'expected ' + i(this.obj) + ' to be an instance of ' + i(_class) },
    function(){ return 'expected ' + i(this.obj) + ' to not be an instance of ' + i(_class) }
  );
  return this;
};

expect.Assertion.prototype.aPrototypeOf = function(prototype){
  this.assert(
    isPrototypeOf.call(this.obj, prototype),
    function(){ return 'expected ' + i(this.obj) + ' to have ' + i(prototype) + ' in it\'s prototype chain' },
    function(){ return 'expected ' + i(this.obj) + ' not to have ' + i(prototype) + ' in it\'s prototype chain' }
  );
  return this;
};
