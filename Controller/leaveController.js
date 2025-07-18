import Leave from "../Models/leave.js";

const createLeave = async (req, res) => {
    try {
        const createdLeave = await Leave.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Leave request created successfully',
            data: createdLeave
        });
    } catch (error) {
        console.error('Error creating leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating leave request',
            error: error.message
        });
    }
};
const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('userId', 'name email');
        res.status(200).json({
            success: true,
            message: 'Leaves retrieved successfully',
            data: leaves
        });
    } catch (error) {
        console.error('Error retrieving leaves:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving leaves',
            error: error.message
        });
    }
};
const getLeaveById = async (req, res) => {
    const { id } = req.params;
    try {
        const leave = await Leave.findById(id).populate('userId', 'name email');
        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Leave request retrieved successfully',
            data: leave
        });
    } catch (error) {
        console.error('Error retrieving leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving leave request',
            error: error.message
        });
    }
};
const deleteLeave = async (req, res) => {
    const { id } = req.params;
    try {
        const leave = await Leave.findByIdAndDelete(id);
        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Leave request deleted successfully',
            data: leave
        });
    } catch (error) {
        console.error('Error deleting leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting leave request',
            error: error.message
        });
    }
};
const updateLeave = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedLeave = await
        Leave.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('userId', 'name email');
        if (!updatedLeave) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Leave request updated successfully',
            data: updatedLeave
        });
    } catch (error) {
        console.error('Error updating leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating leave request',
            error: error.message
        });
    }
};
export { createLeave, getAllLeaves, getLeaveById, deleteLeave, updateLeave };

