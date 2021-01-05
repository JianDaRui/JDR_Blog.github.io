var digui = function(val) {
  if(val <= 0) {
    return val
  }
  var num = digui(val)
  val-=1
  console.log(num)
};

digui(10)