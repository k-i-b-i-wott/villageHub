"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyUser = function verifyUser(req, res, next) {
  var token = req.cookies.token;

  _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY, function (err, user) {
    if (err) {
      return res.status(403).json({
        message: "Please login",
        status: "fail"
      });
    } else {
      req.user = user;
      next();
    }
  });
};

exports.verifyUser = verifyUser;