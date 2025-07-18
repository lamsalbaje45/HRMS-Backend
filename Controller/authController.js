import jwt from 'jsonwebtoken';
import Employee from '../Models/employee.js';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email }).select('+password');
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({ id: employee._id, email: employee.email }, process.env.JWT_SECRET, {expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                employee: {
                    id: employee._id,
                    name: employee.name,
                    email: employee.email
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message
        });   
    }
}
export { login };