
# ascii-histogram

  Ascii histograms for node.

```
     cats | ########################                                     | 6
  ferrets | ############################################################ | 15
     dogs | ########                                                     | 2
   koalas |                                                              | 0


     dogs | ==================== | 30
  ferrets | =============        | 20
     cats | ========             | 12
   koalas | ==                   | 3


  /data | ******************** | 150gb
   /srv | *                    | 5gb
   /etc |                      | 150mb
```

## Installation

```
$ npm install ascii-histogram
```

## Example

```js
var histogram = require('ascii-histogram');
var bytes = require('bytes');

var data = {
  cats: 6,
  ferrets: 15,
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
console.log(histogram(data, { bar: '=', width: 20, sort: true }));

// value mapping

var data = {
  '/srv': bytes('5gb'),
  '/data': bytes('150gb'),
  '/etc': bytes('150mb')
};

console.log();
console.log(histogram(data, { bar: '*', width: 20, sort: true, map: bytes }));
```

# License

  MIT