import { mongoose } from 'mongoose';
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee model
    required: true
  },
  budget:{
    type: Number,
    min : 0
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
}); 
const Department = mongoose.model('Department', departmentSchema);
export default Department;
    
