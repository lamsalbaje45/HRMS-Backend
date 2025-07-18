import Attendance from '../Models/attendance.js';

const createAttendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        const savedAttendance = await attendance.save();
        res.status(201).json({
            success: true,
            message: "Attendance created successfully",
            data: savedAttendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating attendance",
            error: error.message
        });
    }
};
const getAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('employee');
        res.status(200).json({
            success: true,
            message: "Attendance records retrieved successfully",
            data: attendanceRecords
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving attendance records",
            error: error.message
        });
    }
};
const getAttendanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const attendanceRecord = await Attendance.findById(id).populate('employee');
        if (!attendanceRecord) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Attendance record retrieved successfully",
            data: attendanceRecord
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving attendance record",
            error: error.message
        });
    }
};
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAttendance = await Attendance.findByIdAndDelete(id);
        if (!deletedAttendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Attendance record deleted successfully",
            data: deletedAttendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting attendance record",
            error: error.message
        });
    }
};
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('employee');
        if (!updatedAttendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Attendance record updated successfully",
            data: updatedAttendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating attendance record",
            error: error.message
        });
    }
};

export {
    createAttendance,
    getAttendance,
    getAttendanceById,
    deleteAttendance,
    updateAttendance
};


