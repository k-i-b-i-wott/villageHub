import {PrismaClient} from "@prisma/client"
import jwt from "jsonwebtoken"
const client = new PrismaClient()

import bcrypt from "bcrypt";

// Create a new doctor profile
export const createDoctor = async (req, res) => {
    try {
        const {
            specialization,
            licenseNumber,
            yearsOfExperience,
            education,
            hospital,
            consultationFee,
            isAvailable
        } = req.body;

        const doctor = await client.doctor.create({
            data: {
                specialization,
                licenseNumber,
                yearsOfExperience,
                education,
                hospital,
                consultationFee: parseFloat(consultationFee),
                isAvailable: isAvailable !== undefined ? isAvailable : true
            }
        });

        res.status(201).json({
            success: true,
            message: "Doctor profile created successfully",
            data: doctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating doctor profile",
            error: error.message
        });
    }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await client.doctor.findMany({
            where: { isDeleted: false },
            include: { patients: true }
        });
        res.status(200).json({
            success: true,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching doctors",
            error: error.message
        });
    }
};

// Get a single doctor by ID
export const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await client.doctor.findUnique({
            where: { doctorId },
            include: { patients: true }
        });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching doctor",
            error: error.message
        });
    }
};

// Update a doctor profile
export const updateDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const updateData = req.body;
        const doctor = await client.doctor.update({
            where: { doctorId },
            data: updateData
        });
        res.status(200).json({
            success: true,
            message: "Doctor profile updated successfully",
            data: doctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating doctor profile",
            error: error.message
        });
    }
};

// Soft delete a doctor profile
export const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        await client.doctor.update({
            where: { doctorId },
            data: { isDeleted: true }
        });
        res.status(200).json({
            success: true,
            message: "Doctor profile deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting doctor profile",
            error: error.message
        });
    }
};



