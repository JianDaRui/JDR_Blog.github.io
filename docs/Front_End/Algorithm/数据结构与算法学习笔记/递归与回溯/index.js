function text(n) {
  if(n>2){
    text(n-1)
  } else {
    console.log(n)
  }
}

text(7)