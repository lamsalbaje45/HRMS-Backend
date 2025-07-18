import { mongoose } from "mongoose";
const attendanceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    required: true 
  }, 
  date: { 
    type: Date, 
    required: true 
  }, 
  clockIn: { 
    type: Date 
  }, 
  clockOut: { 
    type: Date 
  }, 
  totalHours: { 
    type: Number, 
    default: 0 
  }, 
  status: { 
    type: String, 
    enum: ['present', 'absent', 'half-day', 'leave'], 
    default: 'absent' 
  }, 
  notes: { 
    type: String 
  }, 
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Attendance = mongoose.model('Attendance',attendanceSchema);
export default Attendance;