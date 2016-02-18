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
var initStock = {
  'Twenty Dollar': 20,
  'Ten Dollar': 20,
  'Five Dollar': 20,
  'One Dollar': 20,
  'Fifty Cent': 20,
  'Quarter': 20,
  'Dime': 20,
  'Nickel': 20,
  'Penny': 20
}

var displayStock = function(stock){
  // empty out stock
  $(".currency-stock").html("");
  for (var key in stock){
    $(".currency-stock").append("<td id='" + key.replace(" ","-") + "'>" + stock[key] + "</td>");
  }
}

$(document).ready(function(){
  displayStock(initStock);

  $("#form").on("submit", function(e){
    e.preventDefault();
    var form = form2object(this);
    var price = Number(form.price);
    var payment = Number(form.payment);
    var change = (payment-price).toFixed(2);
    if (isNaN(price) || isNaN(payment)) {
      alert("Please enter valid number!");
    }
    else if (change < 0) {
      alert("You don't have enough money to buy!");
    }
    else{
      var count = {
        'Twenty Dollar': 0,
        'Ten Dollar': 0,
        'Five Dollar': 0,
        'One Dollar': 0,
        'Fifty Cent': 0,
        'Quarter': 0,
        'Dime': 0,
        'Nickel': 0,
        'Penny': 0
      };
      while (change > 0){
        if(change >= 20 && initStock['Twenty Dollar'] > 0) {initStock['Twenty Dollar']--;count['Twenty Dollar']++;change -= 20;continue;}
        if(change >= 10 && initStock['Ten Dollar'] > 0) {initStock['Ten Dollar']--;count['Ten Dollar']++;change -= 10;continue;}
        if(change >= 5 && initStock['Five Dollar'] > 0) {initStock['Five Dollar']--;count['Five Dollar']++;change -= 5;continue;}
        if(change >= 1 && initStock['One Dollar'] > 0) {initStock['One Dollar']--;count['One Dollar']++;change -= 1;continue;}
        if(change >= 0.5 && initStock['Fifty Cent'] > 0) {initStock['Fifty Cent']--;count['Fifty Cent']++;change -= 0.5;continue;}
        if(change >= 0.25 && initStock['Quarter'] > 0) {initStock['Quarter']--;count['Quarter']++;change = (change - 0.25).toFixed(2);continue;}
        if(change >= 0.1 && initStock['Dime'] > 0) {initStock['Dime']--;count['Dime']++;change = (change - 0.1).toFixed(2);continue;}
        if(change >= 0.05 && initStock['Nickel'] > 0) {initStock['Nickel']--;count['Nickel']++;change = (change - 0.05).toFixed(2);continue;}
        if(change >= 0.01 && initStock['Penny'] > 0) {initStock['Penny']--;count['Penny']++;change = (change - 0.01).toFixed(2);continue;}
        if(change > 0 && initStock['Penny'] === 0) {alert("I don't have enough change! Please replenish!"); break;}
      }
      console.log(count);
    }
  })



})
