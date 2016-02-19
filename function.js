var form2object = function(form) {
  var data = {};
  $(form).find("input").each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};

// define initial stock
var initStock = {'2000': 20,'1000': 20,'500': 20,'100': 20,'50': 20,'25': 20,'10': 20,'5': 20,'1': 20};

var currencies = [2000, 1000, 500, 100, 50, 25, 10, 5, 1];

var findChange = function (cents){
    var count = {};
    currencies.forEach(function(currency){
        if (cents > 0) {
          count[currency] = parseInt(cents/currency);
        } else {
          count[currency] = 0;
        }
        cents -= count[currency]*currency;
    })
    return count;
}

var updateStock = function(count, payment){
  var update = initStock;
  // substract change
  for (var key in count){
    update[key] -= count[key];
  }

  // replenish change based on the payment amount
  currencies.forEach(function(currency){
    if (parseInt(payment/currency) !== 0){
        update[currency] += parseInt(payment/currency);
        payment -= parseInt(payment/currency)*currency;
    }
  })
  return update;
}

var displayStock = function(stock){
  // empty out stock
  $(".currency-stock").html("");
  for (var key in stock){
    $(".currency-stock").append("<td id='" + key + "'>" + stock[key] + "</td>");
  }
}

$(document).ready(function(){
  displayStock(initStock);

  $("#form").on("submit", function(e){
    e.preventDefault();
    var form = form2object(this);
    var price = Number(form.price).toFixed(2)*100;
    var payment = Number(form.payment).toFixed(2)*100;
    var change = payment-price;
    if (isNaN(price) || isNaN(payment)) {
      alert("Please enter valid number!");
    }
    else if (change < 0) {
      alert("You don't have enough money to buy!");
    }
    else{
      var changeCount = findChange(change);
      displayStock(updateStock(changeCount,payment));
    }
  })



})
