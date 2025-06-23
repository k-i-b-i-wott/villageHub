"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doctorsRouter = void 0;

var _express = require("express");

var _DoctorController = require("../controllers/DoctorController.js");

var doctorsRouter = (0, _express.Router)();
exports.doctorsRouter = doctorsRouter;
doctorsRouter.route('/').post(_DoctorController.createDoctor).get(_DoctorController.getAllDoctors);
doctorsRouter.route('/:doctorId').get(_DoctorController.getDoctorById).put(_DoctorController.updateDoctor)["delete"](_DoctorController.deleteDoctor);