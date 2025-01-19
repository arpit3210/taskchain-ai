import mongoose from 'mongoose';
import connectMongoDB from '@/lib/mongodb';

export interface ITask extends mongoose.Document {
  title: string;
  description?: string;
  priority: 'Low' | 'Moderate' | 'High';
  status: 'Not Started' | 'In Progress' | 'Completed';
  createdOn: Date;
  updatedAt?: Date;
  dueDate?: Date;
  image?: string;
  userId: string;
}

const TaskSchema = new mongoose.Schema<ITask>({
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  priority: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    default: 'Moderate'
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  dueDate: {
    type: Date,
    required: false
  },
  image: String,
  userId: {
    type: String,
    required: true
  }
});

// Prevent re-compilation of the model
const modelName = 'Task';

// Lazy initialization of the model
let TaskModel: mongoose.Model<ITask>;

function initializeModel() {
  // Ensure mongoose is connected
  if (!mongoose.connection.readyState) {
    throw new Error('Mongoose is not connected. Call connectMongoDB() first.');
  }

  // Check if model is already defined
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  // Create the model if it doesn't exist
  return mongoose.model<ITask>(modelName, TaskSchema);
}

// Export a function to get the model
export default function getTaskModel() {
  // If model is not initialized, initialize it
  if (!TaskModel) {
    try {
      TaskModel = initializeModel();
    } catch (error) {
      console.error('Failed to initialize Task model:', error);
      throw error;
    }
  }
  return TaskModel;
}