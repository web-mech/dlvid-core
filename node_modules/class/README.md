class.js
========

A super small ruby-ish class system with both class and class instance  inheritance.

[![Build Status](https://travis-ci.org/deadlyicon/class.js.png)](https://travis-ci.org/deadlyicon/class.js)

## Example usage:

```javascript

var Animal = Class.new(function(){

  this.class.find = function(id, callback){
    // $.getJSON('/animals/'+id, this.new.bind(this));
  };

  this.initialize = function(attributes){
    this.birthday = new Date;
    this.extend(attributes);
  };

});

var Mammal = Animal.subclass({
  warmBlooded: true
});

var HasLegs = {
  walk: function(feet, direction){
    console.log(this.name, 'is walking', feet, 'feet toward', direction);
  }
};

var Biped = Mammal.subclass(function(){
  this.numberOfLegs = 2;
  this.extend(HasLegs);
});

var Quadruped = Mammal.subclass({
  numberOfLegs: 4,
});

Quadruped.include(HasLegs);

var Kangaroo = Biped.subclass();

var Dog = Quadruped.subclass();

var jumpy = Kangaroo.new({name:'Jumpy'});
jumpy.walk(10,'north');

var sparky = Dog.find(12);

```

## Class.js does not use constructors

```javascript
new Animal //=> TypeError: object is not a function
```

The reason `Animal` is not a `Function` is because functions cannot be created with a prototype other than `Function.prototype`.


## Extend

Both the `Class` and `Class#prototype` objects have an extend function that supports plain objects as well as functions

```javascript
var Kitten = Class.new();

Kitten.extend({
  defaultFurColor: 'orange'
});

Kitten.defaultFurColor; //= 'orange'

Kitten.extend(function(){
  this.brown = true;
});

Kitten.defaultFurColor; //= 'brown'

Kitten.prototype.extend({
  age: 1
});

Kitten.new().age; //= 1

Kitten.prototype.extend(function(){
  this.age = 12;
});

Kitten.new().age; //= 12
```
## subclass

When you call `Animal.subclass()` it returns a new object that points to `Animal`. The new object's prototype property is also a new object that points to `Animal.prototype`.

## modules

A Module can either be a plain object or a function.

```javascript
var Car = Class.new(function(){
  this.initialize = this.extend;
});

var HasEngine = {
  engine: function(){
    if (!this._engine) this._engine = Engine.new(this);
    return this._engine;
  }
};

var PersistedWithLocalStorage = function(){

  function save(){
    // localStorage[…] = …;
    return this;
  }

  function find(id){
    // return this.new(localStorage[…]);
  }

  return function(){
    this.class.find = find;
    this.save = save;
  };

}();

Car.include(HasEngine, PersistedWithLocalStorage);

typeof Car.find //= 'function'
typeof Car.new().save //= 'function'
typeof Car.new().engine //= 'function'
```

## Tests

```bash
npm install mocha
npm install expect.js
mocha -R spec
```
