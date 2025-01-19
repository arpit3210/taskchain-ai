import axios from 'axios';
import { UserResource } from '@clerk/types';
import { ITask } from '@/models/Task';
import { Task } from '@/types/dashboard';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Test backend API connection
export const testBackendConnection = async () => {
  try {
    const response = await api.get('/health');
    return { 
      status: response.data.status, 
      message: response.data.message, 
      timestamp: new Date().toISOString() 
    };
  } catch (error) {
    console.error('Failed to connect to backend API:', error);
    throw error;
  }
};

// Utility function to convert ITask to Task
export function convertToTask(iTask: ITask): Task {
  return {
    id: iTask._id.toString(),
    title: iTask.title,
    description: iTask.description || '',
    priority: iTask.priority,
    status: iTask.status,
    createdOn: iTask.createdOn,
    dueDate: iTask.dueDate,
    image: iTask.image,
    imagePublicId: undefined, // Add this if needed
    userId: iTask.userId
  };
}

export async function fetchTasks(user: UserResource | null): Promise<ITask[]> {
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const response = await api.get(`/tasks?userId=${user.id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// Enhanced logging utility
function logApiCall(method: string, url: string, data?: any, config?: any) {
  console.group(`🔍 API Call: ${method.toUpperCase()} ${url}`);
  console.log('Timestamp:', new Date().toISOString());
  if (data) console.log('Payload:', JSON.stringify(data, null, 2));
  if (config) console.log('Config:', JSON.stringify(config, null, 2));
  console.groupEnd();
}

export async function createTask(user: UserResource | null, taskData: Partial<Task>, imageFile?: File): Promise<ITask> {
  if (!user) {
    console.error('❌ Task Creation Failed: No authenticated user');
    throw new Error('User not authenticated');
  }

  // Comprehensive task payload validation
  const taskPayload = {
    ...taskData,
    userId: user.id,
    image: taskData.image
  };

  // Validate critical fields
  if (!taskPayload.title) {
    console.warn('⚠️ Task Creation Warning: No title provided');
  }

  const formData = new FormData();
  formData.append('taskData', JSON.stringify(taskPayload));

  // Detailed image logging
  if (imageFile) {
    console.log('🖼️ Image Details:', {
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type
    });
    formData.append('image', imageFile);
  } else if (taskData.image) {
    console.log('🔗 Using existing image URL:', taskData.image);
  }

  try {
    // Log API call details before sending
    logApiCall('POST', '/tasks', taskPayload);

    const response = await api.post('/tasks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // Add request timeout and additional tracking
      timeout: 10000,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`📤 Upload Progress: ${percentCompleted}%`);
      }
    });

    console.log('✅ Task Creation Successful:', {
      taskId: response.data._id,
      title: response.data.title
    });

    return response.data;
  } catch (error: any) {
    // Comprehensive error logging
    // console.group('❌ Task Creation Error');
    // console.error('Error Type:', error.constructor.name);

    // if (error.response) {
    //   // Server responded with an error
    //   console.error('Status:', error.response.status);
    //   console.error('Data:', error.response.data);

    //   if (error.response.status === 409) {
    //     const errorDetails = error.response.data;
    //     console.warn('🚨 Duplicate Task Detected:', errorDetails);

    //     const duplicateError = new Error(
    //       errorDetails.suggestion || 'A similar task already exists'
    //     );
    //     (duplicateError as any).details = errorDetails;

    //     console.groupEnd();
    //     throw duplicateError;
    //   }
    // } else if (error.request) {
    //   // Request was made but no response received
    //   console.error('No response received:', error.request);
    // } else {
    //   // Something happened in setting up the request
    //   console.error('Error setting up request:', error.message);
    // }

    // console.groupEnd();
    // throw error;
  }
}

export async function updateTask(user: UserResource | null, task: Task): Promise<ITask> {
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const response = await api.put(`/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      createdOn: task.createdOn,
      dueDate: task.dueDate,
      image: task.image,
      userId: user.id
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(user: UserResource | null, taskId: string): Promise<void> {
  if (!user) {
    throw new Error('User not authenticated');
  }

  console.log('Deleting task:', { taskId, userId: user.id });

  try {
    await api.delete(`/tasks/${taskId}`, {
      params: { userId: user.id }
    });
  } catch (error) {
    console.error('Error deleting task:', error);
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