import { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ITask } from '@/models/Task';
import { Task } from '@/types/dashboard';
import { fetchTasks, createTask } from '@/lib/api';

export function useTasks(): {
  tasks: Task[];
  rawTasks: ITask[];
  isLoading: boolean;
  error: Error | null;
  loadTasks: () => Promise<void>;
  addTask: (taskData: Partial<Task>, imageFile?: File) => Promise<ITask>;
  reloadTasks: () => Promise<void>;
} {
  const [rawTasks, setRawTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();

  const loadTasks = useCallback(async () => {
    if (!user) {
      setRawTasks([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks: ITask[] = await fetchTasks(user);
      setRawTasks(fetchedTasks || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError(err instanceof Error ? err : new Error('Failed to load tasks'));
      setRawTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addTask = useCallback(async (taskData: Partial<Task>, imageFile?: File) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);
    try {
      const newTask: ITask = await createTask(user, taskData, imageFile);
      
      // Prevent duplicate tasks in local state
      setRawTasks(prevTasks => {
        // More sophisticated duplicate check
        const isDuplicate = prevTasks.some(task => 
          task.title === newTask.title && 
          task.description === newTask.description &&
          task.userId === newTask.userId &&
          task.status === newTask.status
        );

        return isDuplicate ? prevTasks : [...prevTasks, newTask];
      });

      return newTask;
    } catch (err: any) {
      // Distinguish between different types of errors
      if (err.response && err.response.status === 409) {
        // Duplicate task error
        const errorMessage = err.response.data.suggestion || 'Similar task already exists';
        setError(new Error(errorMessage));
        throw err; // Rethrow to be handled by caller
      } else {
        // Other errors
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to add task';
        setError(new Error(errorMessage));
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const reloadTasks = useCallback(async () => {
    await loadTasks();
  }, [loadTasks]);

  // Convert tasks to frontend Task type for consumption
  const convertedTasks: Task[] = rawTasks.map(task => ({
    id: task._id.toString(),
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    status: task.status,
    createdOn: task.createdOn,
    dueDate: task.dueDate,
    image: task.image,
    imagePublicId: undefined, // Add if needed
    userId: task.userId
  }));

  return {
    tasks: convertedTasks,
    rawTasks,
    isLoading,
    error,
    loadTasks,
    addTask,
    reloadTasks
  };
}