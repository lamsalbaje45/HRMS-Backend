import express from 'express';
import { createLeave, getAllLeaves, getLeaveById, deleteLeave, updateLeave } from '../Controller/leaveController.js';
const router = express.Router();

router.post('/', createLeave);
router.get('/', getAllLeaves); 
router.get('/:id', getLeaveById);
router.delete('/:id', deleteLeave);
router.put('/:id', updateLeave);

export default router;