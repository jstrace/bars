var should = require('should');
var bars = require('./index');
var bytes = require('bytes');

describe('bars', function () {

  it('it should display bars', function () {
    var data = { aa: 10, bbbbb: 999, c: 88 };
    var expected = '\
     aa |            | 10\n\
  bbbbb | ########## | 999\n\
      c | #          | 88\n\
';
    bars(data, { width: 10 }).should.equal(expected);
  });

  it('it should customize output', function () {
    var data = { d: 1, e: 6 };
    var expected = '\
  d | ===             | 1\n\
  e | =============== | 6\n\
';
    bars(data, { width: 15, bar: '=' }).should.equal(expected);
  });

  it('it should sort output', function () {
    var data = { d: 1, e: 6, f: 3 };
    var expected = '\
  e | ########## | 6\n\
  f | #####      | 3\n\
  d | ##         | 1\n\
';
    bars(data, { width: 10, sort: true }).should.equal(expected);
  });

  it('it should use keys in order', function () {
    var data = { d: 1, e: 6, '0': 7 };
    var expected = '\
  d | #          | 1\n\
  e | #########  | 6\n\
  0 | ########## | 7\n\
';
    bars(data, { width: 10, keys: ['d', 'e', '0'] }).should.equal(expected);
  });

  it('it should map values', function () {
    var data = {
      '/srv': bytes('5gb'),
      '/data': bytes('150gb'),
      '/etc': bytes('150mb')
    };
    var expected = '\
  /data | ******************** | 150gb\n\
   /srv | *                    | 5gb\n\
   /etc |                      | 150mb\n\
';
    bars(data, { bar: '*', width: 20, sort: true, map: bytes }).should.equal(expected);
  });


  it('it should handle all zeros', function () {
    var data = { a: 0, b: 0 };
    var expected = '\
  a |            | 0\n\
  b |            | 0\n\
';
    bars(data, { width: 10 }).should.equal(expected);
  });

  it('it should handle a single zero', function () {
    var data = { a: 0, b: 5 };
    var expected = '\
  a |            | 0\n\
  b | ########## | 5\n\
';
    bars(data, { width: 10 }).should.equal(expected);
  });

});