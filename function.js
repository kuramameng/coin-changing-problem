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

var initStock = function(){

}

$(document).ready(function(){
  initStock();

  $("#form").on("submit", function(e){
    e.preventDefault();
    var form = form2object(this);
    if (isNaN(Number(form.price)) || isNaN(Number(form.payment))) {
      alert("Please enter valid number!");
    }
    else if (Number(form.price) > Number(form.payment)) {
      alert("You don't have enough money to buy!");
    }
    else{
      console.log(Number(form.price), Number(form.payment));

    }
  })



})
