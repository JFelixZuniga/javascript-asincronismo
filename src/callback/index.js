function sum(num1, num2){
  return num1+num2
}

function calc(num12, num22, callback){
  return callback(num12, num22)
}

console.log(calc(2,2,sum))
console.log(sum(4,4))

function date(callback){
  console.log(new Date)
  setTimeout(() => {
    let date = new Date;
    callback(date)
  }, 3000);
}

function printDate(dateNow){
  console.log(dateNow)
}

date(printDate)