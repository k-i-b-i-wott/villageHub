"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDoctor = exports.updateDoctor = exports.getDoctorById = exports.getAllDoctors = exports.createDoctor = void 0;

var _client = require("@prisma/client");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var client = new _client.PrismaClient();

// Create a new doctor profile
var createDoctor = function createDoctor(req, res) {
  var _req$body, specialization, licenseNumber, yearsOfExperience, education, hospital, consultationFee, isAvailable, doctor;

  return regeneratorRuntime.async(function createDoctor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, specialization = _req$body.specialization, licenseNumber = _req$body.licenseNumber, yearsOfExperience = _req$body.yearsOfExperience, education = _req$body.education, hospital = _req$body.hospital, consultationFee = _req$body.consultationFee, isAvailable = _req$body.isAvailable;
          _context.next = 4;
          return regeneratorRuntime.awrap(client.doctor.create({
            data: {
              specialization: specialization,
              licenseNumber: licenseNumber,
              yearsOfExperience: yearsOfExperience,
              education: education,
              hospital: hospital,
              consultationFee: parseFloat(consultationFee),
              isAvailable: isAvailable !== undefined ? isAvailable : true
            }
          }));

        case 4:
          doctor = _context.sent;
          res.status(201).json({
            success: true,
            message: "Doctor profile created successfully",
            data: doctor
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: "Error creating doctor profile",
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get all doctors


exports.createDoctor = createDoctor;

var getAllDoctors = function getAllDoctors(req, res) {
  var doctors;
  return regeneratorRuntime.async(function getAllDoctors$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.doctor.findMany({
            where: {
              isDeleted: false
            },
            include: {
              patients: true
            }
          }));

        case 3:
          doctors = _context2.sent;
          res.status(200).json({
            success: true,
            data: doctors
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: "Error fetching doctors",
            error: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get a single doctor by ID


exports.getAllDoctors = getAllDoctors;

var getDoctorById = function getDoctorById(req, res) {
  var doctorId, doctor;
  return regeneratorRuntime.async(function getDoctorById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          doctorId = req.params.doctorId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(client.doctor.findUnique({
            where: {
              doctorId: doctorId
            },
            include: {
              patients: true
            }
          }));

        case 4:
          doctor = _context3.sent;

          if (doctor) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Doctor not found"
          }));

        case 7:
          res.status(200).json({
            success: true,
            data: doctor
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            message: "Error fetching doctor",
            error: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Update a doctor profile


exports.getDoctorById = getDoctorById;

var updateDoctor = function updateDoctor(req, res) {
  var doctorId, updateData, doctor;
  return regeneratorRuntime.async(function updateDoctor$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          doctorId = req.params.doctorId;
          updateData = req.body;
          _context4.next = 5;
          return regeneratorRuntime.awrap(client.doctor.update({
            where: {
              doctorId: doctorId
            },
            data: updateData
          }));

        case 5:
          doctor = _context4.sent;
          res.status(200).json({
            success: true,
            message: "Doctor profile updated successfully",
            data: doctor
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            message: "Error updating doctor profile",
            error: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Soft delete a doctor profile


exports.updateDoctor = updateDoctor;

var deleteDoctor = function deleteDoctor(req, res) {
  var doctorId;
  return regeneratorRuntime.async(function deleteDoctor$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          doctorId = req.params.doctorId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(client.doctor.update({
            where: {
              doctorId: doctorId
            },
            data: {
              isDeleted: true
            }
          }));

        case 4:
          res.status(200).json({
            success: true,
            message: "Doctor profile deleted successfully"
          });
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            success: false,
            message: "Error deleting doctor profile",
            error: _context5.t0.message
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteDoctor = deleteDoctor;