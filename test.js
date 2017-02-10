var assert = require('assert');
var bars = require('./index');

var options = {width: 10};

var zeros = {a: 0, b: 0};
var zerosExpected = '\
  a |            | 0\n\
  b |            | 0\n\
';
assert.equal(bars(zeros, options), zerosExpected, 'it should handle all zeros');

var zeroFive = {a: 0, b: 5};
var zeroFiveExpected = '\
  a |            | 0\n\
  b | ########## | 5\n\
';
assert.equal(bars(zeroFive, options), zeroFiveExpected, 'it should handle a single zero');

console.log('PASS');
