define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/*<replacement>*/
var bufferShim = require('readable-stream/lib/buffer-shims');
/*</replacement>*/
var common = require('readable-stream/common');
var stream = require('readable-stream/../');
var util = require('util');

function Writable() {
  this.writable = true;
  stream.Writable.call(this);
  this.prependListener = undefined;
}
util.inherits(Writable, stream.Writable);
Writable.prototype._write = function (chunk, end, cb) {
  cb();
};

function Readable() {
  this.readable = true;
  stream.Readable.call(this);
}
util.inherits(Readable, stream.Readable);
Readable.prototype._read = function () {
  this.push(null);
};

var w = new Writable();
w.on('pipe', common.mustCall(function () {}));

var r = new Readable();
r.pipe(w);

return module.exports;});
