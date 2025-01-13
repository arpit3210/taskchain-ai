import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080', // Adjust this to your front-end URL
  credentials: true
}));
app.use(express.json());

// Connect to Database
connectDB();

// Basic route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    message: 'Server is up and running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});