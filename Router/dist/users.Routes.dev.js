"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileRouter = exports.chatBotRouter = exports.usersRouter = void 0;

var _express = require("express");

var _UserControllers = require("../controllers/UserControllers.js");

var _AllfieldsRequired = require("../middlewares/AllfieldsRequired.js");

var _UniqueIds = require("../middlewares/UniqueIds.js");

var _ChatBotCotroller = require("../controllers/ChatBot.Cotroller.js");

var _UserLoggedIn = require("../middlewares/UserLoggedIn.js");

var usersRouter = (0, _express.Router)();
exports.usersRouter = usersRouter;
usersRouter.route('/register').post(_AllfieldsRequired.AllfieldsRequired, _UniqueIds.CheckEmailPassword, _UserControllers.createUser);
usersRouter.route('/login').post(_UserControllers.loginUser);
var chatBotRouter = (0, _express.Router)();
exports.chatBotRouter = chatBotRouter;
chatBotRouter.route('/chatbot').post(_ChatBotCotroller.chatBot);
var profileRouter = (0, _express.Router)();
exports.profileRouter = profileRouter;
profileRouter.route('/profile').get(_UserLoggedIn.verifyUser, _UserControllers.UserProfile);