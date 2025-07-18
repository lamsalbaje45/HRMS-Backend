import express from 'express';
import {createEmployee,getAllEmployees, getEmployeeById,deleteEmployee,updateEmployee} from '../Controller/employeecontroller.js'; // Adjust the path as necessary
import { authenticateToken, roleMiddleware } from '../Middlewares/authMiddleware.js'; 
import upload from '../utils/imageUpload.js';
const router = express.Router();

router.post('/', authenticateToken, roleMiddleware(['admin','manager']), upload.single('profileImage'), createEmployee);
router.get('/', authenticateToken, getAllEmployees); 
router.get('/:id', authenticateToken, getEmployeeById); 
router.delete('/:id', authenticateToken, roleMiddleware(['admin','manager']), deleteEmployee); 
router.put('/:id', authenticateToken, roleMiddleware(['admin','manager']), updateEmployee); 

export default router;