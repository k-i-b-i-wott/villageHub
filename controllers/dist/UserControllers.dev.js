"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfile = exports.loginUser = exports.createUser = void 0;

var _client = require("@prisma/client");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var client = new _client.PrismaClient();

var createUser = function createUser(req, res) {
  var _req$body, firstName, lastName, emailAddress, userName, password, address, phoneNumber, profileImage, hashedPassword, user;

  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, emailAddress = _req$body.emailAddress, userName = _req$body.userName, password = _req$body.password, address = _req$body.address, phoneNumber = _req$body.phoneNumber, profileImage = _req$body.profileImage;
          _context.next = 3;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, 12));

        case 3:
          hashedPassword = _context.sent;
          console.log(req.body);
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(client.user.create({
            data: {
              firstName: firstName,
              lastName: lastName,
              emailAddress: emailAddress,
              userName: userName,
              password: hashedPassword,
              address: address,
              phoneNumber: phoneNumber,
              profileImage: profileImage
            }
          }));

        case 8:
          user = _context.sent;
          res.status(201).json({
            message: "User created successfully",
            data: user
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          res.status(500).json({
            message: "Error creating user",
            error: _context.t0
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

exports.createUser = createUser;

var loginUser = function loginUser(req, res) {
  var _req$body2, identifier, password, user, isPasswordValid, payLoad, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, identifier = _req$body2.identifier, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(client.user.findFirst({
            where: {
              OR: [{
                emailAddress: identifier
              }, {
                userName: identifier
              }]
            }
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 9:
          isPasswordValid = _context2.sent;

          if (isPasswordValid) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "Incorrect password"
          }));

        case 12:
          payLoad = {
            userId: user.userId,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
            address: user.address,
            profileImage: user.profileImage
          };
          token = _jsonwebtoken["default"].sign(payLoad, process.env.JWT_SECRET_KEY, {});
          res.status(200).cookie("token", token).json({
            message: "Login successful",
            data: user
          });
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: "Error logging in",
            data: _context2.t0
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

exports.loginUser = loginUser;

var UserProfile = function UserProfile(req, res) {
  var userId, userInfo;
  return regeneratorRuntime.async(function UserProfile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.user.userId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(client.user.findFirst({
            where: {
              userId: userId
            }
          }));

        case 4:
          userInfo = _context3.sent;
          res.status(200).json({
            message: "User profile",
            data: userInfo
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.json({
            message: "An error occurred",
            status: "Fail",
            data: _context3.t0
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.UserProfile = UserProfile;