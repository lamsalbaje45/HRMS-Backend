import express from 'express';
import { createAttendance, getAttendance, getAttendanceById, deleteAttendance, updateAttendance } from '../Controller/attendanceController.js';
const router = express.Router();

router.post('/', createAttendance);
router.get('/', getAttendance); 
router.get('/:id', getAttendanceById);
router.delete('/:id', deleteAttendance);
router.put('/:id', updateAttendance);

export default router;