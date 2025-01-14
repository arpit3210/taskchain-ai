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

export async function createTask(user: UserResource | null, taskData: Partial<Task>, imageFile?: File): Promise<ITask> {
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
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Moderate',
      status: taskData.status || 'Not Started',
      createdOn: new Date(),
      dueDate: taskData.dueDate,
      userId: user.id,
      image: taskData.image // Preserve existing image URL if provided
    };
    formData.append('taskData', JSON.stringify(taskPayload));

    // Add image if exists
    if (imageFile) {
      formData.append('image', imageFile);
      console.log('Image file added to form data');
    } else if (taskData.image) {
      console.log('Using existing image URL');
    }

    const response = await axios.post(`${API_BASE_URL}/tasks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
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

  try {
    await api.delete(`/tasks/${taskId}?userId=${user.id}`);
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