// Back end logic
var Sizes = Object.freeze({
  small:   { value: 0, multiplier: 0.7, display: "Small" },
  medium:  { value: 1, multiplier: 1.0, display: "Medium" },
  large:   { value: 2, multiplier: 1.2, display: "Large" },
  xlarge:  { value: 3, multiplier: 1.5, display: "Extra Large" },
});
function getSizeFromValue(value) {
  for (size in Sizes) {
    if (Sizes[size].value === value) {
      return Sizes[size];
    };
  };
};
var Toppings = Object.freeze({
  xtra_cheese: { value: 0, cost: 1.00, type: "cheese", display:"Extra Cheese" },
  pepperoni:   { value: 1, cost: 0.75, type: "meat", display:"Pepperoni" },
  sausage:     { value: 2, cost: 0.75, type: "meat", display:"Sausage" },
  salami:      { value: 3, cost: 0.75, type: "meat", display:"Salami" },
  ham:         { value: 4, cost: 0.75, type: "meat", display:"Ham" },
  mushrooms:   { value: 5, cost: 0.75, type: "veg", display:"Mushrooms" },
  olives:      { value: 6, cost: 0.75, type: "veg", display:"Olives" },
  peppers:     { value: 7, cost: 0.75, type: "veg", display:"Peppers" },
  pineapple:   { value: 8, cost: 0.75, type: "veg", display:"Pineapples" },
  onion:       { value: 9, cost: 0.80, type: "veg", display:"Onions" },
  jalapaneos:  { value: 10, cost: 0.75, type: "veg", display:"Jalapaneos" },
});
function getToppingFromValue(value) {
  value = parseInt(value);
  for (topping in Toppings) {
    if (Toppings[topping].value === value) {
      return Toppings[topping];
    };
  };
};
function getToppingFromName(name) {
  for (topping in Toppings) {
    if (Toppings[topping].display === name) {
      return Toppings[topping];
    };
  };
};
var meats = $.map(Toppings, function(key, value) {
  if (key.type === "meat") {
    return key.display;
  };
});
var veggies = $.map(Toppings, function(key, value) {
  if (key.type === "veg") {
    return key.display;
  };
});
function Pizza() {
  this.id = "p" + Date.now();
  this.name;
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
Pizza.prototype.addToppingByValue = function(value) {
  var topping = getToppingFromValue(value);
  var dontHaveTopping = (this.toppings.indexOf(topping) === -1);
  if (dontHaveTopping) {
    this.toppings.push(topping);
  };
}
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
          return key.display;
        };
      }).toString()
    );
  });
  return names;
};
Pizza.prototype.getSize = function() {
  var size = this.size
  return $.map(Sizes, function(key, value) {
    if (key === size) {
      return key.display;
    };
  });
};
Pizza.prototype.setSize = function(size) {
  size = parseInt(size);
  this.size = getSizeFromValue(size);
}
Pizza.prototype.cost = function() {
  var toppingsCost = 0;
  this.toppings.forEach(function(topping) {
    toppingsCost += topping.cost;
  });
  return this.baseCost * this.size.multiplier + toppingsCost;
};
function Order() {
  // this.customer;
  this.address;
  this.date;
  this.delivery = false;
  this.address;
  this.pizzas = [];
};
Order.prototype.addPizza = function(name, size) {
  var pizza = new Pizza();
  pizza.name = name;
  pizza.setSize(size);
  if (arguments.length > 2) {
    for (var i = 2; i < arguments.length; i++) {
      pizza.addTopping(arguments[i]);
    };
  };
  this.pizzas.push(pizza);
};
Order.prototype.totalCost = function() {
  var totalCost = 0;
  this.pizzas.forEach(function(pizza) {
    totalCost += pizza.cost();
  });
  return totalCost;
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
  var order = new Order();
  // var customer = new Customer("Guest");
  var dom = {
    // customerName:   $('.customerName'),
    orderDetails:   $('.orderDetails'),
    checkout:       $('#checkout'),
    sizeList:       $('.sizeList'),
    addressForm:    $('#address'),
    checkoutModal:  { all:     $('#checkoutModal'),
                      header:  $('#checkoutModal .modal-header'),
                      body:    $('#checkoutModal modal-body'),
                      radio:   $('input[name=delivery]:radio'),
                      form:    $('#checkoutModal #deliveryConfirm'),
                      order:   $('#checkoutModal #orderConfirm'),
                      confirm: $('#checkoutModal #confirmDelivery'),
                      cancel:  $('#checkoutModal #cancelDelivery') },
    customizeModal: { all:     $('#customizeModal'),
                      header:  $('#customizeModal .modal-header'),
                      body:    $('#customizeModal .modal-body'),
                      meats:   $('#customizeModal #meats'),
                      veggies: $('#customizeModal #veggies'),
                      add:     $('#customizeModal #customizeAdd'),
                      remove:  $('#customizeModal #customizeRemove') },
    combos:         { hawaiianSize:  $('select#comboHawaiianSize'),
                      supremeSize:   $('select#comboSupremeSize'),
                      pepperoniSize: $('select#comboPepperoniSize'),
                      customSize:    $('select#comboCustomSize') },
    buttons:        { addHawaiian:    $('button#addHawaiian'),
                      addSupreme:     $('button#addSupreme'),
                      addPepperoni:   $('button#addPepperoni'),
                      customizePizza: $('button#customizePizza') }
  };
  for (size in Sizes) {
    dom.sizeList.append(
      "<option value='" + Sizes[size].value + "'>" + Sizes[size].display + "</option>"
    );
  };
  meats.forEach(function(meat, i) {
    value = getToppingFromName(meat).value;
    dom.customizeModal.meats.append(
      "<div class='checkbox'>" +
        "<label><input type='checkbox' name='toppings' value='" + value +"'>" + meat + "</label>" +
      "</div>"
    );
  });
  veggies.forEach(function(veg, i) {
    value = getToppingFromName(veg).value;
    dom.customizeModal.veggies.append(
      "<div class='checkbox'>" +
        "<label><input type='checkbox' name='toppings' value='" + value +"'>" + veg + "</label>" +
      "</div>"
    );
  });
  function updateOrderDetails() {
    if (order.pizzas.length) {
      dom.checkout.slideDown();
    } else {
      dom.checkout.slideUp();
    }
    dom.orderDetails.children().remove();
    order.pizzas.forEach(function(pizza) {
      dom.orderDetails.append(
        "<li>" +
          "<h5 class='pizzaName'>" + pizza.getSize() + " " + pizza.name + "<span class='pull-right'>" + pizza.cost().toFixed(2) + "</span></h5>" +
          "<ul class=' pizzaToppings " + pizza.id + "'></ul>" +
        "</li>"
      );
      pizza.getToppings().forEach(function(topping) {
        $('.' + pizza.id).append(
          "<li>" +
            "<p>" + topping + "</p>"+
          "</li>"
        );
      });
      $('#orderDisplay .pizzaName').last().click(function() {
        $(this).siblings().slideToggle();
      })
    });
    dom.orderDetails.append(
      "<hr>" +
      "<p>Total cost: <strong class='pull-right'>" + order.totalCost().toFixed(2) + "</strong></p>"
    );
  };
  // order.customer = customer;
  // dom.customerName.text(order.customer.name);
  updateOrderDetails();
  dom.buttons.addHawaiian.click(function() {
    var size = dom.combos.hawaiianSize.val();
    order.addPizza("Hawaiian", size, 'pineapple', 'ham');
    updateOrderDetails();
    dom.combos.hawaiianSize.val("");
    dom.buttons.addHawaiian.prop("disabled", true);
  });
  dom.buttons.addSupreme.click(function() {
    var size = dom.combos.supremeSize.val();
    order.addPizza("Supreme", size, 'pepperoni', 'sausage', 'peppers', 'onion');
    updateOrderDetails();
    dom.combos.supremeSize.val("");
    dom.buttons.addSupreme.prop("disabled", true);
  });
  dom.buttons.addPepperoni.click(function() {
    var size = dom.combos.pepperoniSize.val();
    order.addPizza("Pepperoni", size, 'pepperoni');
    updateOrderDetails();
    dom.combos.pepperoniSize.val("");
    dom.buttons.addPepperoni.prop("disabled", true);
  });
  dom.buttons.customizePizza.click(function() {
    dom.customizeModal.all.modal('show');
  });
  dom.customizeModal.add.click(function() {
    var toppings = [];
    var pizza = new Pizza();
    pizza.name = "Custom Pizza";
    pizza.setSize(dom.combos.customSize.val());
    $("input:checkbox[name=toppings]:checked").each(function(){
      toppings.push($(this).val());
    });
    if (toppings) {
      toppings.forEach(function(topping) {
        pizza.addToppingByValue(topping);
      });
    };
    order.pizzas.push(pizza);
    updateOrderDetails();
    dom.combos.customSize.val("");
    dom.customizeModal.all.modal('hide');
    dom.buttons.customizePizza.prop("disabled", true);
  });
  dom.combos.hawaiianSize.change(function() {
    dom.buttons.addHawaiian.prop("disabled", false);
  });
  dom.combos.supremeSize.change(function() {
    dom.buttons.addSupreme.prop("disabled", false);
  });
  dom.combos.pepperoniSize.change(function() {
    dom.buttons.addPepperoni.prop("disabled", false);
  });
  dom.combos.customSize.change(function() {
    dom.buttons.customizePizza.prop("disabled", false);
  });
  dom.checkout.click(function() {
    dom.checkoutModal.all.modal('show');
  });
  dom.checkoutModal.radio.change(function() {
    order.delivery = parseInt($("input:radio[name=delivery]:checked").val());
    if (order.delivery) {
      dom.addressForm.slideDown();
      $('span#deliveryType').text("delivery");
    } else {
      dom.addressForm.slideUp();
      $('span#deliveryType').text("carry out");
    };
  });
  dom.checkoutModal.confirm.click(function() {
    dom.checkoutModal.form.hide();
    dom.checkoutModal.order.show();
    if (order.delivery) {
      $('#deliveryInfo').text("Delivery");
      var address = new Address();
      address.name = $('input#name').val();
      address.street = $('input#street').val();
      address.city = $('input#city').val();
      address.state = $('input#state').val();
      address.zip = $('input#zip').val();
      order.address = address;
      $('#deliveryInfo').append(
        "<p>" + order.address.name + "</p>" +
        "<p>" + order.address.street + "</p>" +
        "<p>" +
          order.address.city + ", " +
          order.address.state + " " +
          order.address.zip +
        "</p>"
      );
    } else {
      $('#deliveryInfo').text("Carry out");
    };
  });
});
