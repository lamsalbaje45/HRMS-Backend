import emp from './employeeRoute.js'; // Import the employee routes
import auth from './authRoutes.js'; // Import the auth routes
import dept from './departmentRoute.js'; // Import the department routes
import atnd from './attendanceRoutes.js'; // Import the attendance routes
import leave from './leaveRoute.js'; // Import the leave routes
import pay from './payrollRoute.js'; // Import the payroll routes
import perf from './performanceRoute.js'; // Import the performance routes
import express from 'express';

const router = express.Router(); // Create a new router instance

router.use('/employees', emp); // Use the employee routes
router.use('/auth', auth); // Use the auth routes
router.use('/departments', dept); // Use the department routes  
router.use('/attendance', atnd); // Use the attendance routes
router.use('/leave', leave); // Use the leave routes
router.use('/payroll', pay); // Use the payroll routes
router.use('/performance', perf); // Use the performance routes

export default router;