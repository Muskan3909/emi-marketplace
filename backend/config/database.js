// C:\Users\muska\OneDrive\Desktop\emi\emi-marketplace\backend\config\database.js

import mongoose from 'mongoose'; // Use ESM import
import 'dotenv/config';          // If you need to load .env variables here

const connectDB = async () => {
  try {
    // Ensure you are using the MONGODB_URI from your .env file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Exiting the process here is good practice if the database connection fails
    process.exit(1);
  }
};

export default connectDB; // Use ESM default export