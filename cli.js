#!/usr/bin/env node

var readline = require('readline');
var tty = require('tty');
var parseArgs = require('minimist');

var bars = require('.');

function usage(message) {
  if (message) {
    console.log(message);
    console.log();
  }
  console.log('Ascii bar charting');
  console.log();
  console.log('Usage:');
  console.log('  bars [--width <n>] [--bar <char>] [--sort]');
  console.log();
  console.log('Input format:');
  console.log();
  console.log('  <count> <key>');
  console.log();
  console.log('  Provide data on stdin.');
  console.log('  Leading, trailing, or extra spaces in the middle are ignored.');
  console.log();
  console.log('Options:');
  console.log('  --width <n>   Restrict chart to <n> characters. [default: 60]');
  console.log('  --bar <char>  Use <char> to draw the bars. [default: #]');
  console.log('  --sort        Sort the list in descending order');
  console.log();
  console.log('Example:');
  console.log('  bars --width 40 --bar █ --sort < my-data.txt');

  process.exit(1);
}

// Options from command line
var opts = parseArgs(process.argv.slice(2));

if (opts.h || opts.help) {
  usage();
}

// Data from pipe
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

if (tty.isatty(process.stdin.fd) && !opts.force) {
  usage("Input is a tty. You probably meant to pipe in data.\n" +
    "To read from a tty anyway, re-run with --force.");
}

var data = {};
rl.on('line', function(line) {
  var fields = line.split(/\s+/).filter(function(line) { return line; });

  // line format is the same used by uniq -c:
  //   <count> <key>
  var count = parseInt(fields[0]);
  var key = fields.slice(1).join(' ');

  if (!count || !key || isNaN(count)) {
    usage('Bad line: \n| ' + line + '\nExpecting: <count> <key>');
  }

  data[key] = count;
});

rl.on('close', function() {
  if (Object.keys(data).length == 0) {
    usage('No data. Provide data on stdin.')
  }

  console.log(bars(data, opts));

  process.exit(0)
});

rl.on('SIGINT', function() {
  process.exit(1);
});

