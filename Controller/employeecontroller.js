import Employee from "../Models/employee.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const hashedPassword = await bcrypt.hash(employee.password,10);
    employee.password = hashedPassword; // Store the hashed passwordd backend
    const savedEmployee = await employee.save();

    sendEmail(employee.email, 'Welcome to our company', 'Hello ' 
            + employee.name + 
            ', welcome to our company. We are glad to have you on board. ' + 
            'Your login credentials are as follows: \nEmail: ' 
            + employee.email + '\nPassword: ' + req.body.password + '\n\nThank you,\nAdmin');
    const { password:_, ...employeeData } = savedEmployee.toObject(); // Exclude password from the response4
    
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: savedEmployee
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating employee',
      error: error.message
    });
  }
}

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: 'Employees retrieved successfully',
      data: employees
    });
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving employees',
      error: error.message
    });
  }
}

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Employee retrieved successfully',
      data: employee
    });
  } catch (error) {
    console.error('Error retrieving employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving employee',
      error: error.message
    });
  }
}

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: employee
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message
    });
  }
}

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  try {
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating employee',
      error: error.message
    });
  }
};

export { createEmployee, getAllEmployees, getEmployeeById, deleteEmployee,updateEmployee };
