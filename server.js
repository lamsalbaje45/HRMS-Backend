
import express from 'express'; // Uncomment this line if using ES6 modules
import mongoose from 'mongoose';
import router from './Routes/index.js'; // Import the routes
import Employee from './Models/employee.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Import cookie-parser to handle cookies
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

const MONGODB_URI = process.env.MONGO_URI
const connectDB = mongoose.connect(MONGODB_URI);
connectDB
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if connection fails
  }); 

  const seedAdmin = async () => {
    try {
        const admin = await Employee.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
            await Employee.create({
                name: 'Admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin' // Set the role to admin
            });
          }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
  }
seedAdmin(); // Call the function to seed the admin user
// Middleware to parse JSON bodies
app.use(cors({
  origin:'*',
  credentials: true
}));
app.use(express.json()); 
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
// Middleware to serve static files
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Routes
app.use('/api', router); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});