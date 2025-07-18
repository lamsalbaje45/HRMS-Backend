import jwt from 'jsonwebtoken';
import Employee from '../Models/employee.js';

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = await Employee.findById(decoded.id).select('-password');

        next();

    } catch (Exception) {
        console.error(Exception.message);
        res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });  
    }
} 

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        // if (!req.employee.role === roles)
         if (!roles.includes(req.employee.role)) {  
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have the required role"
            });
        } 
        next();
    }
}

export { authenticateToken, roleMiddleware };