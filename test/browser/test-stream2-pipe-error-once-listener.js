define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
'use strict';
//var common = require('readable-stream/common');

var inherits = require('inherits');
var stream = require('readable-stream/');

module.exports = function (t) {
  t.test('pipe error once listener', function (t){
    t.plan(1);
    var Read = function() {
      stream.Readable.call(this);
    };
    inherits(Read, stream.Readable);

    Read.prototype._read = function(size) {
      this.push('x');
      this.push(null);
    };


    var Write = function() {
      stream.Writable.call(this);
    };
    inherits(Write, stream.Writable);

    Write.prototype._write = function(buffer, encoding, cb) {
      this.emit('error', new Error('boom'));
      this.emit('alldone');
    };

    var read = new Read();
    var write = new Write();

    write.once('error', function(err) {});
    write.once('alldone', function(err) {
      t.ok(true);
    });

    read.pipe(write);
  });
}

return module.exports;});
