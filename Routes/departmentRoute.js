import express from 'express';
import { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } from '../Controller/departmentController.js';
const router = express.Router();

router.post('/', createDepartment);
router.get('/', getDepartments);
router.get('/:id', getDepartmentById);
router.delete('/:id', deleteDepartment);
router.put('/:id', updateDepartment);

export default router;