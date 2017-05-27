define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';
//var common = require('readable-stream/common');
var stream = require('readable-stream/');
var inherits = require('inherits');
module.exports = function (t) {
  t.test('pipe event', function (t) {
    t.plan(1);
    function Writable() {
      this.writable = true;
      require('stream').Stream.call(this);
    }
    inherits(Writable, require('stream').Stream);

    function Readable() {
      this.readable = true;
      require('stream').Stream.call(this);
    }
    inherits(Readable, require('stream').Stream);

    var passed = false;

    var w = new Writable();
    w.on('pipe', function(src) {
      passed = true;
    });

    var r = new Readable();
    r.pipe(w);

    t.ok(passed);
  });
}

return module.exports;});
