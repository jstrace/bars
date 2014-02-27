
var histogram = require('..');

var data = {
  ferrets: 15,
  cats: 6,
  dogs: 2,
  koalas: 0
};

console.log();
console.log(histogram(data));

// customized

var data = {
  ferrets: 20,
  cats: 12,
  dogs: 30,
  koalas: 3
};

console.log();
console.log(histogram(data, { bar: '=', width: 20 }));