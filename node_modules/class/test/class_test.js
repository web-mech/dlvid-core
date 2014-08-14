if (typeof require === 'function'){
  require('./test_helper');
  var Class  = require('../class.js');
  var expect = require('expect.js');
}

describe("Class", function(){

  it("should be an object", function(){
    expect(Class).to.be.a('object');
  });

  describe(".Object", function(){

    describe(".instantiate", function(){

      it("should return an instance of Class.Object", function() {
        var object = Class.Object.instantiate();
        expect(Class.Object).to.be.aPrototypeOf(object);
      });

      it("should return take an extensions and extend to new object", function() {
        var object = Class.Object.instantiate({foo:'bar'});
        expect(object.foo).to.equal('bar');
      });

    });

    describe(".extend", function(){
      it("should extend `this' with the given extensions", function() {

        var object = Class.Object.instantiate();

        var hasShoes = function(arg1, arg2) {
          this.b = 2;
          arg1.c = 3;
          arg2.d = 4;
        }

        object.extend({a:1},hasShoes,{e:5});

        expect(object.a).to.equal(1);
        expect(object.b).to.equal(2);
        expect(object.c).to.equal(3);
        expect(object.d).to.equal(4);
        expect(object.e).to.equal(5);
      });
    });

  });

  describe(".new", function(){

    it("should return a new class", function(){
      expect(Class.new()).to.be.aClass();
    });

    describe(".subclass", function(){
      it("should return a subclass", function(){
        var Animal = Class.new();
        var Mammal = Animal.subclass();
        var Human  = Mammal.subclass();

        expect(Mammal).to.be.aClass();
        expect(Mammal.superclass).to.be(Animal);
        expect(Mammal).to.aSubclassOf(Animal);

        expect(Human).to.be.aClass();
        expect(Human.superclass).to.be(Mammal);
        expect(Human).to.aSubclassOf(Mammal);
      });
    });

    describe(".new", function() {

      it("should return an instance of the class", function() {
        var Animal = Class.new({
          initialize: function(name){
            this.name = name;
          }
        });

        var myPet = Animal.new('pookums');

        expect(myPet).not.to.be.aClass();
        expect(myPet).to.be.anInstanceOf(Animal);
        expect(myPet.name).to.equal('pookums');

      });

    });

  });

});

describe("inheritance", function() {

  it("", function(){

    var Animal = Class.new();
    var Mammal = Animal.subclass();
    var Dog    = Mammal.subclass();
    var Cat    = Mammal.subclass();
    var sparky = Dog.new();
    var mitten = Cat.new();

    Animal.animal_class_attribute = 1;
    Animal.prototype.animal_instance_attribute = 2;
    Mammal.mammal_class_attribute = 3;
    Mammal.prototype.mammal_instance_attribute = 4;
    Dog.dog_class_attribute = 5;
    Dog.prototype.dog_instance_attribute = 6;
    Cat.cat_class_attribute = 7;
    Cat.prototype.cat_instance_attribute = 8;

    expect(Animal).to.be.anInstanceOf(Class);
    expect(Animal).not.to.be.aSubclassOf(Class);
    expect(Animal).not.to.be.aSubclassOf(Animal);
    expect(Animal).not.to.be.aSubclassOf(Mammal);
    expect(Animal).not.to.be.aSubclassOf(Dog);
    expect(Animal).not.to.be.aSubclassOf(Cat);

    expect(Mammal).to.be.anInstanceOf(Class);
    expect(Mammal).not.to.be.aSubclassOf(Class);
    expect(Mammal).to.be.aSubclassOf(Animal);
    expect(Mammal).not.to.be.aSubclassOf(Mammal);
    expect(Mammal).not.to.be.aSubclassOf(Dog);
    expect(Mammal).not.to.be.aSubclassOf(Cat);

    expect(Dog).to.be.anInstanceOf(Class);
    expect(Dog).not.to.be.aSubclassOf(Class);
    expect(Dog).to.be.aSubclassOf(Animal);
    expect(Dog).to.be.aSubclassOf(Mammal);
    expect(Dog).not.to.be.aSubclassOf(Dog);
    expect(Dog).not.to.be.aSubclassOf(Cat);

    expect(Cat).to.be.anInstanceOf(Class);
    expect(Cat).not.to.be.aSubclassOf(Class);
    expect(Cat).to.be.aSubclassOf(Animal);
    expect(Cat).to.be.aSubclassOf(Mammal);
    expect(Cat).not.to.be.aSubclassOf(Dog);
    expect(Cat).not.to.be.aSubclassOf(Cat);


    expect(sparky).to.be.anInstanceOf(Animal);
    expect(sparky).to.be.anInstanceOf(Mammal);
    expect(sparky).to.be.anInstanceOf(Dog);
    expect(sparky).not.to.be.anInstanceOf(Cat);

    expect(mitten).to.be.anInstanceOf(Animal);
    expect(mitten).to.be.anInstanceOf(Mammal);
    expect(mitten).not.to.be.anInstanceOf(Dog);
    expect(mitten).to.be.anInstanceOf(Cat);



    expect( Cat.animal_class_attribute    ).to.be(1)
    expect( Cat.animal_instance_attribute ).to.be(undefined)
    expect( Cat.mammal_class_attribute    ).to.be(3)
    expect( Cat.mammal_instance_attribute ).to.be(undefined)
    expect( Cat.dog_class_attribute       ).to.be(undefined)
    expect( Cat.dog_instance_attribute    ).to.be(undefined)
    expect( Cat.cat_class_attribute       ).to.be(7)
    expect( Cat.cat_instance_attribute    ).to.be(undefined)

    expect( Dog.animal_class_attribute    ).to.be(1)
    expect( Dog.animal_instance_attribute ).to.be(undefined)
    expect( Dog.mammal_class_attribute    ).to.be(3)
    expect( Dog.mammal_instance_attribute ).to.be(undefined)
    expect( Dog.dog_class_attribute       ).to.be(5)
    expect( Dog.dog_instance_attribute    ).to.be(undefined)
    expect( Dog.cat_class_attribute       ).to.be(undefined)
    expect( Dog.cat_instance_attribute    ).to.be(undefined)

    expect( sparky.animal_class_attribute    ).to.be(undefined)
    expect( sparky.animal_instance_attribute ).to.be(2)
    expect( sparky.mammal_class_attribute    ).to.be(undefined)
    expect( sparky.mammal_instance_attribute ).to.be(4)
    expect( sparky.dog_class_attribute       ).to.be(undefined)
    expect( sparky.dog_instance_attribute    ).to.be(6)
    expect( sparky.cat_class_attribute       ).to.be(undefined)
    expect( sparky.cat_instance_attribute    ).to.be(undefined)

    expect( mitten.animal_class_attribute    ).to.be(undefined)
    expect( mitten.animal_instance_attribute ).to.be(2)
    expect( mitten.mammal_class_attribute    ).to.be(undefined)
    expect( mitten.mammal_instance_attribute ).to.be(4)
    expect( mitten.dog_class_attribute       ).to.be(undefined)
    expect( mitten.dog_instance_attribute    ).to.be(undefined)
    expect( mitten.cat_class_attribute       ).to.be(undefined)
    expect( mitten.cat_instance_attribute    ).to.be(8)

  })
});

