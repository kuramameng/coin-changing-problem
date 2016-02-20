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
var initAmount = 20;

var initStock = {'2000': initAmount,'1000': initAmount,'500': initAmount,'100': initAmount,'50': initAmount,'25': initAmount,'10': initAmount,'5': initAmount,'1': initAmount};

var currencies = [2000, 1000, 500, 100, 50, 25, 10, 5, 1];

var calChange = function (change){
    var count = {};
    currencies.forEach(function(currency){
        // determin if there's the best solution, if there's not enough coins, find the second best solution
        if (change > 0 && initStock[currency] >= parseInt(change/currency)) {
          count[currency] = parseInt(change/currency);
        } else {
          count[currency] = 0;
        }
        change -= count[currency]*currency;
    })
    return count;
}

var updateStock = function(count, payment){
  // var update = initStock;
  // substract change
  for (var key in count){
    // update[key] -= count[key];
    initStock[key] -= count[key];
  }
  // replenish change based on the payment amount
  currencies.forEach(function(currency){
    if (parseInt(payment/currency) !== 0){
        // update[currency] += parseInt(payment/currency);
        initStock[currency] += parseInt(payment/currency);

        payment -= parseInt(payment/currency)*currency;
    }
  })
  // return update;
  return initStock;
}

var displayChange = function(count){
  $(".minus-change").html("");
  for (var key in count){
    $(".minus-change").append("<td id='" + key + "' style='color: red;'>-" + count[key] + "</td>");
  }
}

var displayRep = function(payment){
  $(".plus-payment").html("");
  var rep = {};
  currencies.forEach(function(currency){
    rep[currency] = parseInt(payment/currency);
    payment -= parseInt(payment/currency)*currency;
  })
  for (var key in rep){
    $(".plus-payment").append("<td id='" + key + "' style='color: green;'>+" + rep[key] + "</td>");
  }
}

var displayStock = function(stock){
  // empty out stock
  $(".currency-stock").html("");
  for (var key in stock){
    $(".currency-stock").append("<td id='" + key + "'>" + stock[key] + "</td>");
  }
}

var displayResult = function(count){
  $("#result").html("Here is your change:\nPennies: " + count['1'] + "\nNickels: " + count['5'] + "\nDimes: " + count['10'] + "\nQuarters: " + count['25'] + "\nFifty cents: " + count['50'] + "\n$1: " + count['100'] + "\n$5: " + count['500'] + "\n$10: " + count['1000'] + "\n$20: " + count['2000']);
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
      var changeCount = calChange(change);
      displayStock(updateStock(changeCount,payment));
      displayChange(changeCount);
      displayRep(payment);
      displayResult(changeCount);
    }
  })
})
