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
  var count = {'2000': 0,'1000': 0,'500': 0,'100': 0,'50': 0,'25': 0,'10': 0,'5': 0,'1': 0};;
  currencies.forEach(function(currency){
    // determin if there's the best solution
    if (change > 0 && initStock[currency] >= parseInt(change/currency)) {
      count[currency] = parseInt(change/currency);
    } else if (initStock[currency] < parseInt(change/currency) && initStock[currency] > 0){
      progressiveChange(change, count);
      return count;
    } else {
      count[currency] = 0;
    }
    change -= count[currency]*currency;
  })
  // update initStock
  for (var key in count){
    initStock[key] -= count[key];
  }
  return count;
}

var progressiveChange = function(change, count){
  while (change >= 0){
    if(change >= 2000 && initStock['2000'] > 0) {initStock['2000']--;count['2000']++;change -= 2000;continue;}
    if(change >= 1000 && initStock['1000'] > 0) {initStock['1000']--;count['1000']++;change -= 1000;continue;}
    if(change >= 500 && initStock['500'] > 0) {initStock['500']--;count['500']++;change -= 500;continue;}
    if(change >= 100 && initStock['100'] > 0) {initStock['100']--;count['100']++;change -= 100;continue;}
    if(change >= 50 && initStock['50'] > 0) {initStock['50']--;count['50']++;change -= 50;continue;}
    if(change >= 25 && initStock['25'] > 0) {initStock['25']--;count['25']++;change = change - 25;continue;}
    if(change >= 10 && initStock['10'] > 0) {initStock['10']--;count['10']++;change = change - 10;continue;}
    if(change >= 5 && initStock['5'] > 0) {initStock['5']--;count['5']++;change = change - 5;continue;}
    if(change >= 1 && initStock['1'] > 0) {initStock['1']--;count['1']++;change = change - 1;continue;}
    if(change > 0 && initStock['1'] == 0) {alert("I don't have enough change"); break;}
  }
}

var updateStock = function(count, payment){
  // replenish change based on the payment amount
  currencies.forEach(function(currency){
    if (parseInt(payment/currency) !== 0){
        // update[currency] += parseInt(payment/currency);
        initStock[currency] += parseInt(payment/currency);

        payment -= parseInt(payment/currency)*currency;
    }
  })
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
