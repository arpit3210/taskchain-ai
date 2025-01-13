import axios from 'axios';
import { UserResource } from '@clerk/types';
import { ITask } from '@/models/Task';
import getTaskModel from '@/models/Task';
import connectMongoDB from '@/lib/mongodb';

// Use a mock backend for development
const MOCK_TASKS: ITask[] = [];
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Test backend API connection
export const testBackendConnection = async () => {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();
    
    return { 
      status: 'healthy', 
      message: 'Mock backend is working', 
      timestamp: new Date().toISOString() 
    };
  } catch (error) {
    console.error('Failed to connect to backend API:', error);
    throw error;
  }
};

// Test general connection
export const testConnection = async () => {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};

export async function fetchTasks(user: UserResource | null): Promise<ITask[]> {
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Get the Task model
    const Task = getTaskModel();

    // Fetch tasks for the user
    return await Task.find({ userId: user.id });
  } catch (error) {
    console.error('Failed to fetch tasks', error);
    throw new Error('Failed to fetch tasks');
  }
}

export async function createTask(user: UserResource | null, taskData: Partial<ITask>): Promise<ITask> {
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Validate required fields
  if (!taskData.title) {
    throw new Error('Task title is required');
  }

  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    // Get the Task model
    const Task = getTaskModel();

    console.log('Creating task with data:', taskData);
    
    // Create a new Task document
    const newTask = new Task({
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Moderate',
      status: taskData.status || 'Not Started',
      createdOn: new Date(),
      userId: user.id,
      dueDate: taskData.dueDate || undefined,
      image: taskData.image || undefined
    });

    // Save the task
    await newTask.save();
    
    console.log('Task created successfully:', newTask);
    return newTask.toObject();
  } catch (error) {
    console.error('Failed to create task', error);
    throw error;
  }
}

// Utility function to validate task
function validateTask(task: ITask): void {
  if (!task.title) {
    throw new Error('Task title cannot be empty');
  }
  if (task.title.length > 100) {
    throw new Error('Task title cannot exceed 100 characters');
  }
  if (task.description && task.description.length > 500) {
    throw new Error('Task description cannot exceed 500 characters');
  }
}

// Utility function to generate unique ID
function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}