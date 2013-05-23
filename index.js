GLOBAL.js = function () {
  return '';
}

module.exports = function () {
  return function (req, res, next) {
    return next();
  }
}
