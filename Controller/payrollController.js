import Payroll from "../Models/payroll.js";

const createPayroll = async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    const savedPayroll = await payroll.save();
    res.status(201).json({
      success: true,
      message: 'Payroll created successfully',
      data: savedPayroll
    });
  } catch (error) {
    console.error('Error creating payroll:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payroll',
      error: error.message
    });
  }
};

const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.status(200).json({
      success: true,
      message: 'Payrolls retrieved successfully',
      data: payrolls
    });
  } catch (error) {
    console.error('Error retrieving payrolls:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving payrolls',
      error: error.message
    });
  }
};

const getPayrollById = async (req, res) => {
  const { id } = req.params;
  try {
    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Payroll retrieved successfully',
      data: payroll
    });
  } catch (error) {
    console.error('Error retrieving payroll:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving payroll',
      error: error.message
    });
  }
};

const deletePayroll = async (req, res) => {
  const { id } = req.params;
  try {
    const payroll = await Payroll.findByIdAndDelete(id);
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Payroll deleted successfully',
      data: payroll
    });
  } catch (error) {
    console.error('Error deleting payroll:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting payroll',
      error: error.message
    });
  }
};

const updatePayroll = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPayroll = await Payroll.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPayroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Payroll updated successfully',
      data: updatedPayroll
    }); 
    } catch (error) {
    console.error('Error updating payroll:', error);
    res.status(500).json({  
      success: false,
      message: 'Error updating payroll',
      error: error.message
    }); 
    }
};

export { createPayroll, getAllPayrolls, getPayrollById, deletePayroll, updatePayroll };

  
