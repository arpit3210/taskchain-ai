import axios from 'axios';
import { UserResource } from '@clerk/types';
import { ITask } from '@/models/Task';

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

export async function createTask(user: UserResource | null, taskData: Partial<ITask>, imageFile?: File): Promise<ITask> {
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Validate required fields
  if (!taskData.title) {
    throw new Error('Task title is required');
  }

  try {
    // Create FormData for multipart upload
    const formData = new FormData();
    
    // Prepare task payload
    const taskPayload = {
      ...taskData,
      userId: user.id
    };
    console.log('Task Payload:', taskPayload);
    formData.append('taskData', JSON.stringify(taskPayload));

    // Add image if exists
    if (imageFile) {
      console.log('Uploading image:', imageFile);
      formData.append('image', imageFile);
    } else {
      console.log('No image file provided');
    }

    const response = await axios.post(`${API_BASE_URL}/tasks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Task creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
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