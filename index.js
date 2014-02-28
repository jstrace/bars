
/**
 * Module dependencies.
 */

var fmt = require('printf');

/**
 * Expose `histogram()`.
 */

module.exports = histogram;

/**
 * Return ascii histogram of `data`.
 *
 * @param {Object} data
 * @param {Object} [opts]
 * @return {String}
 * @api public
 */

function histogram(data, opts) {
  opts = opts || {};

  // options

  var width = opts.width || 60;
  var barc = opts.bar || '#';
  var map = opts.map || noop;

  // normalize data

  var data = toArray(data);
  if (opts.sort) data = data.sort(descending);

  var maxKey = max(data.map(function(d){ return d.key.length }));
  var maxVal = max(data.map(function(d){ return d.val }));
  var str = '';

  // blah blah histo

  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var p = (d.val / maxVal) || 1;
    var shown = Math.round(width * p);
    var blank = width - shown
    var bar = Array(shown + 1).join(barc);
    bar += Array(blank + 1).join(' ');
    str += fmt('  %*s | %s | %s\n', d.key, maxKey, bar, map(d.val));
  }

  return str;
}

/**
 * Sort descending.
 */

function descending(a, b) {
  return b.val - a.val;
}

/**
 * Return max in array.
 */

function max(data) {
  var n = data[0];

  for (var i = 1; i < data.length; i++) {
    n = data[i] > n ? data[i] : n;
  }

  return n;
}

/**
 * Turn object into an array.
 */

function toArray(obj) {
  return Object.keys(obj).map(function(key){
    return {
      key: key,
      val: obj[key]
    }
  })
}

/**
 * Noop map function.
 */

function noop(val) {
  return val;
}