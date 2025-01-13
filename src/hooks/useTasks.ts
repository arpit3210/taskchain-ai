// src/hooks/useTasks.ts
import { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ITask } from '@/models/Task';
import { fetchTasks, createTask } from '@/lib/api';

export function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();

  const loadTasks = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await fetchTasks(user);
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load tasks'));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addTask = useCallback(async (taskData: Partial<ITask>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);
    try {
      const newTask = await createTask(user, taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add task'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const reloadTasks = useCallback(async () => {
    await loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    addTask,
    reloadTasks
  };
}