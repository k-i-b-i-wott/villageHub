"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatBot = void 0;

var _genai = require("@google/genai");

var ai = new _genai.GoogleGenAI({
  apiKey: "AIzaSyCVw4QC-nLnR-9GttVBYGXSsMuq1dB1RFg"
});

var chatBot = function chatBot(req, res) {
  var prompt, response;
  return regeneratorRuntime.async(function chatBot$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          prompt = req.body.prompt;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
          }));

        case 4:
          response = _context.sent;
          res.status(200).json({
            message: "Responded",
            data: response.text
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: "Error",
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.chatBot = chatBot;