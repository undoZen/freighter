var cmdUtil = require('cmd-util');
var fs = require('fs');
var path = require('path');
var exists = fs.exists || path.exists;
var ast = cmdUtil.ast;

module.exports = function (options) {
  options = options || {};
  var parentDir = path.dirname(module.parent.filename);
  options.js = options.js || 'javascripts';
  options.root = options.root || path.join(parentDir, 'public');
  options.root = path.resolve(options.root);
  var seajsDist = path.join(path.dirname(path.dirname(require.resolve('seajs'))), 'dist');

  GLOBAL.js = function () {
    return '<script src="'+ path.join('/', options.js, 'sea.js') + '"></script>';
  }

  var astOrNext = function (filepath, next, callback) {
    filepath = filepath.replace(/\?.*/, '');
    if (!(filepath.match(/\.js$/))) return next();
    var fullfilepath = path.join(seajsDist, filepath.replace(options.js + '/', ''));
    exists(fullfilepath, function (x) {
      if (x) {
        fs.readFile(fullfilepath, 'utf8', function (err, content) {
          if (err) next(err);
          else callback(content);
        })
      } else {
        fullfilepath = path.join(options.root, filepath);
        fs.readFile(fullfilepath, 'utf8', function (err, content) {
          if (err) return next();
          if (ast.parseFirst(ast.getAst(content))) {
            callback(content);
          } else {
            callback('define(function(require, exports, module){ // added by freighter\n' +
              content +
              '\n}); // added by freighter');
          }
        });
      }
    })
  }
  return function (req, res, next) {
    astOrNext(req.url, next, function (script) {
      res.end(script);
    })
  }
}
