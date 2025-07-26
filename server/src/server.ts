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
import Task, { ITask } from './models/Task';
import { ParamsDictionary } from 'express-serve-static-core';

// Load environment variables from .env file
dotenv.config();

interface TypedRequestParams extends ParamsDictionary {
  taskId: string;
}

interface TypedQueryParams {
  userId?: string;
}

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
async function createTaskHandler(req: Request, res: Response): Promise<void> {
  try {
    console.group('Task Creation Process');
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    // Parse task data from the request
    const taskData: Partial<ITask> = JSON.parse(req.body.taskData);

    // Handle file upload if exists
    let cloudinaryResult: any;
    if (req.file) {
      try {
        cloudinaryResult = await uploadToCloudinary(req.file);
        taskData.image = cloudinaryResult.secure_url;
        taskData.imagePublicId = cloudinaryResult.public_id;
      } catch (uploadError) {
        console.error('Cloudinary Upload Error:', uploadError);
        // Continue with task creation even if image upload fails
      }
    }

    // More precise duplicate task detection
    const similarTask = await Task.findOne({
      userId: taskData.userId,
      title: { $regex: new RegExp(`^${taskData.title}$`, 'i') },
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status
    });

    console.log('Similar Task Found:', similarTask ? 'Yes' : 'No');

    if (similarTask) {
      console.warn('Potential duplicate task detected');
      console.groupEnd();

      // res.status(409).json({
      //   message: 'A similar task already exists'
      // });
      // return;
    }

    try {
      // Create and save the new task
      const newTask = new Task(taskData);
      await newTask.save();

      console.log('Task created successfully:', newTask);
      console.groupEnd();

      res.status(201).json(newTask);
    } catch (saveError: unknown) {
      const errorMessage = saveError instanceof Error
        ? saveError.message
        : 'Unknown save error';
      console.error('Error saving task:', errorMessage);
      console.groupEnd();

      // res.status(500).json({
      //   message: 'Error saving task',
      //   error: errorMessage
      // });
    }
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'Unexpected error';

    console.error('Unexpected error in task creation:', errorMessage);
    console.groupEnd();

    // res.status(500).json({
    //   message: 'Unexpected error creating task',
    //   error: errorMessage
    // });
  }
}

// Register the handler with proper typing
app.post('/api/tasks', upload.single('image'), async (req: Request, res: Response) => {
  await createTaskHandler(req, res);
});

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

const deleteTaskHandler: RequestHandler<
  TypedRequestParams,
  any,
  any,
  TypedQueryParams
> = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.query;
    console.log('Delete task request:', { taskId, userId });

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId: userId });

    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    if (deletedTask.imagePublicId) {
      await cloudinary.uploader.destroy(deletedTask.imagePublicId);
    }

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      message: 'Error deleting task',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Apply the handler to the route
app.delete('/api/tasks/:taskId', deleteTaskHandler);

// Update Task Handler
const updateTaskHandler: RequestHandler<
  TypedRequestParams,
  any,
  Partial<ITask>,
  TypedQueryParams
> = async (req: Request, res: Response) => {
  try {
    console.group('Task Update Process');
    const { taskId } = req.params;
    const { userId } = req.query;
    console.log('Update task request:', { taskId, userId });

    // Validate user ID
    if (!userId) {
      console.warn('Update task failed: No user ID provided');
      console.groupEnd();
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the existing task
    const existingTask = await Task.findOne({ _id: taskId, userId });
    if (!existingTask) {
      console.warn('Update task failed: Task not found');
      console.groupEnd();
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Parse task data from the request body or form data
    const updateData: Partial<ITask> = req.file 
      ? JSON.parse(req.body.taskData) 
      : req.body;

    // Handle image update
    if (req.file) {
      try {
        // If existing task had an image, delete it from Cloudinary
        if (existingTask.imagePublicId) {
          await cloudinary.uploader.destroy(existingTask.imagePublicId);
        }

        // Upload new image to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(req.file);
        updateData.image = cloudinaryResult.secure_url;
        updateData.imagePublicId = cloudinaryResult.public_id;
      } catch (uploadError) {
        console.error('Cloudinary Image Update Error:', uploadError);
        // Optionally, you can choose to fail the update or continue without image
      }
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId, 
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    console.log('Task updated successfully:', updatedTask);
    console.groupEnd();

    res.status(200).json(updatedTask);
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error during task update';

    console.error('Error updating task:', errorMessage);
    console.groupEnd();

    res.status(500).json({
      message: 'Error updating task',
      error: errorMessage
    });
  }
};

// Register the update task route with file upload support
app.put('/api/tasks/:taskId', upload.single('image'), async (req: Request, res: Response) => {
  await updateTaskHandler(req, res);
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