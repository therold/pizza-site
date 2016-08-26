// Back end logic
var Sizes = Object.freeze({
  small:   { value: 0, multiplier: 0.7 },
  medium:  { value: 1, multiplier: 1.0 },
  large:   { value: 2, multiplier: 1.2 },
  xlarge:  { value: 3, multiplier: 1.5 },
});
var sizes = Object.keys(Sizes);
var Toppings = Object.freeze({
  xtra_cheese: { value: 0, cost: 1.00, type: "cheese" },
  pepperoni:   { value: 1, cost: 0.75, type: "meat" },
  sausage:     { value: 2, cost: 0.75, type: "meat" },
  salami:      { value: 3, cost: 0.75, type: "meat" },
  ham:         { value: 4, cost: 0.75, type: "meat" },
  mushrooms:   { value: 5, cost: 0.75, type: "veg" },
  olives:      { value: 6, cost: 0.75, type: "veg" },
  peppers:     { value: 7, cost: 0.75, type: "veg" },
  pineappe:    { value: 8, cost: 0.75, type: "veg" },
  onion:       { value: 9, cost: 0.80, type: "veg" },
  jalapaneos:  { value: 10, cost: 0.75, type: "veg" },
});
var meats = $.map(Toppings, function(key, value) {
  if (key.type === "meat") {
    return value;
  };
});
var veggies = $.map(Toppings, function(key, value) {
  if (key.type === "veg") {
    return value;
  };
});
function Pizza() {
  this.size;
  this.toppings = [];
  this.baseCost = 12;
};
Pizza.prototype.addTopping = function(topping) {
  var dontHaveTopping = (this.toppings.indexOf(Toppings[topping]) === -1);
  if (dontHaveTopping) {
    this.toppings.push(Toppings[topping]);
  };
};
Pizza.prototype.removeTopping = function(topping) {
  var haveTopping = (this.toppings.indexOf(Toppings[topping]) !== -1);
  if (haveTopping) {
    this.toppings.splice(this.toppings.indexOf(Toppings[topping]), 1);
  };
};
Pizza.prototype.getToppings = function() {
  var names = [];
  this.toppings.forEach(function(topping) {
    names.push(
      $.map(Toppings, function(key, value) {
        if (key === topping) {
          return value;
        };
      }).toString()
    );
  });
  return names;
};
Pizza.prototype.getSize = function() {
  var size = this.size;
  return $.map(Sizes, function(key, value) {
    if (key === size) {
      return value;
    };
  });
};
Pizza.prototype.setSize = function(size) {
  this.size = Sizes[size];
}
Pizza.prototype.cost = function() {
  var toppingsCost = 0;
  this.toppings.forEach(function(topping) {
    toppingsCost += topping.cost;
  });
  return (this.baseCost * this.size.multiplier + toppingsCost).toFixed(2);
};
function Order() {
  this.person = "";
  this.address = "";
  this.date = "";
  this.pizzas = [];
};
function Customer() {
  this.name = "";
  this.addresses = [];
};
function Address() {
  this.name = "";
  this.street = "";
  this.city = "";
  this.state = "";
  this.zip = "";
}

// Front end logic
$(document).ready(function() {

});
