import express, { 
  Request, 
  Response, 
  NextFunction, 
  RequestHandler 
} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Task from './models/Task';

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://arpitsinghthakur321:064EkDhktztpzvzs@cluster0.jnsifwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Multer configuration for file upload
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});

// Enhanced CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:8080', 'http://127.0.0.1:5173'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// MongoDB Connection with enhanced error handling
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((err: unknown) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Cloudinary upload helper function
const uploadToCloudinary = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: 'task-images',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
      }, 
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    uploadStream.end(file.buffer);
  });
};

// Create Task with Image Upload
const createTaskHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received task creation request');
    console.log('Raw request body:', req.body);
    console.log('Request file:', req.file);

    // Parse task data from the request
    let taskData: any;
    try {
      taskData = JSON.parse(req.body.taskData);
    } catch (parseError: unknown) {
      const errorMessage = parseError instanceof Error 
        ? parseError.message 
        : 'Invalid task data format';
      
      console.error('Error parsing task data:', errorMessage);
      res.status(400).json({ 
        message: 'Invalid task data format', 
        error: errorMessage 
      });
    }

    // Handle file upload if exists
    let cloudinaryResult: any;
    if (req.file) {
      try {
        cloudinaryResult = await uploadToCloudinary(req.file);
        console.log('Cloudinary upload result:', cloudinaryResult);
        
        // Add Cloudinary image details to task data
        taskData.image = cloudinaryResult.secure_url;
        taskData.imagePublicId = cloudinaryResult.public_id;
      } catch (uploadError: unknown) {
        const errorMessage = uploadError instanceof Error 
          ? uploadError.message 
          : 'Cloudinary upload failed';
        
        console.error('Cloudinary upload error:', errorMessage);
        // Optionally, you can choose to continue without the image
        // or return an error
      }
    } else {
      console.log('No image file in the request');
    }

    // Ensure required fields are present
    if (!taskData.title) {
      res.status(400).json({ 
        message: 'Task title is required' 
      });
    }

    // Enhanced Duplicate Prevention with more precise matching
    const similarTask = await Task.findOne({
      title: taskData.title,
      userId: taskData.userId,
      // Only check for exact matches, not partial
      description: taskData.description,
      status: taskData.status,
      priority: taskData.priority
    });

    if (similarTask) {
      console.warn('Exact duplicate task detected:', similarTask);
      res.status(409).json({ 
        message: 'An identical task already exists',
        suggestion: 'This task is an exact duplicate of an existing task.',
        existingTask: similarTask 
      });
      return;
    }

    try {
      const newTask = new Task(taskData);
      await newTask.save();
      
      console.log('Task created successfully:', newTask);
      res.status(201).json(newTask);
    } catch (saveError: unknown) {
      const errorMessage = saveError instanceof Error 
        ? saveError.message 
        : 'Unknown save error';
      
      console.error('Error saving task:', errorMessage);
      res.status(500).json({ 
        message: 'Error saving task', 
        error: errorMessage 
      });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unexpected error';
    
    console.error('Unexpected error in task creation:', errorMessage);
    res.status(500).json({ 
      message: 'Unexpected error creating task', 
      error: errorMessage 
    });
  }
};

// Register the handler with proper typing
app.post('/api/tasks', upload.single('image'), createTaskHandler);

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    message: 'Backend is running smoothly',
    timestamp: new Date().toISOString(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Get Tasks
app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    console.log('Fetching tasks for userId:', userId);
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error: unknown) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      message: 'Error fetching tasks', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: err.message || 'Unknown error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false).then(() => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    }).catch((err) => {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    });
  });
});