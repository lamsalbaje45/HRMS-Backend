import Performance from "../Models/performance.js";

const createPerformance = async (req, res) => {
    try {
        const performance = new Performance(req.body);
        const savedPerformance = await performance.save();
        res.status(201).json({
            success: true,
            message: 'Performance record created successfully',
            data: savedPerformance
        });
    } catch (error) {
        console.error('Error creating performance record:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating performance record',
            error: error.message
        });
    }
};

const getAllPerformances = async (req, res) => {
    try {
        const performances = await Performance.find().populate('employee');
        res.status(200).json({
            success: true,
            message: 'Performance records retrieved successfully',
            data: performances
        });
    } catch (error) {
        console.error('Error retrieving performance records:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving performance records',
            error: error.message
        });
    }
};

const getPerformanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const performance = await Performance.findById(id).populate('employee');
        if (!performance) {
            return res.status(404).json({
                success: false,
                message: 'Performance record not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Performance record retrieved successfully',
            data: performance
        });
    } catch (error) {
        console.error('Error retrieving performance record:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving performance record',
            error: error.message
        });
    }
};

const deletePerformance = async (req, res) => {
    const { id } = req.params;
    try {
        const performance = await Performance.findByIdAndDelete(id);
        if (!performance) {
            return res.status(404).json({
                success: false,
                message: 'Performance record not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Performance record deleted successfully',
            data: performance
        });
    } catch (error) {
        console.error('Error deleting performance record:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting performance record',
            error: error.message
        });
    }
};

const updatePerformance = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPerformance = await Performance.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPerformance) {
            return res.status(404).json({
                success: false,
                message: 'Performance record not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Performance record updated successfully',
            data: updatedPerformance
        });
    } catch (error) {
        console.error('Error updating performance record:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating performance record',
            error: error.message
        });
    }
};

export { createPerformance, getAllPerformances, getPerformanceById, deletePerformance, updatePerformance };

    
