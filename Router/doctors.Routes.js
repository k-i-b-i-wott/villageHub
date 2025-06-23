import { Router } from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from '../controllers/DoctorController.js';

export const doctorsRouter = Router();

doctorsRouter.route('/')
  .post(createDoctor)
  .get(getAllDoctors);

doctorsRouter.route('/:doctorId')
  .get(getDoctorById)
  .put(updateDoctor)
  .delete(deleteDoctor); 