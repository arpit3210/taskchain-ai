import { useState, useEffect } from 'react'
import { SlidingSidebar } from "@/components/sliding-sidebar";
import { Header } from "@/DashboardComponents/header";
import { TaskCard } from "@/DashboardComponents/task-card";
import { TaskStatus } from "@/DashboardComponents/task-status";
import { Task, TaskStatus as TaskStatusType } from "@/types/dashboard";
import { Link } from 'react-router-dom';
import { AddTaskModal } from '@/components/AddTaskModal';
import { useTasks } from '@/hooks/useTasks';
import { deleteTask, updateTask } from '@/lib/api';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { ITask } from '@/models/Task';

export default function Dashboard() {
  const { user } = useUser();
  const { 
    tasks: rawTasks, 
    isLoading, 
    error, 
    loadTasks, 
    addTask 
  } = useTasks();

  // Convert ITask to Task
  const tasks: Task[] = rawTasks ? rawTasks.map(task => ({
    id: task?.id?.toString() || '',
    title: task.title || 'Untitled Task',
    description: task.description || '',
    priority: task.priority || 'Low',
    status: task.status || 'Not Started',
    createdOn: task.createdOn ? 
      (typeof task.createdOn === 'string' ? new Date(task.createdOn) : task.createdOn) 
      : new Date(),
    dueDate: task.dueDate ? 
      (typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate) 
      : undefined,
    image: task.image,
    imagePublicId: undefined,
    userId: task.userId || ''
  })) : [];

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, [user]);

  const handleAddTask = async (taskData: Partial<Task>) => {
    try {
      await addTask(taskData);
      setIsAddTaskModalOpen(false);
      toast.success('Task added successfully');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleEditTask = async (updatedTask: Task) => {
    try {
      if (!user) return;
      await updateTask(user, updatedTask);
      await loadTasks();
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      if (!user) return;
      await deleteTask(user, taskId);
      await loadTasks();
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const calculateTaskStatus = () => {
    const taskStatus: TaskStatusType = {
      completed: tasks.filter(task => task.status === 'Completed').length,
      inProgress: tasks.filter(task => task.status === 'In Progress').length,
      notStarted: tasks.filter(task => task.status === 'Not Started').length
    };
    return taskStatus;
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <SlidingSidebar />
      <main className="transition-all duration-300 ease-in-out 
        sm:pl-20 
        lg:pl-72 
        min-h-screen 
        p-4 
        sm:p-6">
        <div className="flex-1">
          <Header
            date="20/06/2023"
            teamMembers={[
              { id: '1', avatar: 'https://v0.dev/placeholder.svg' },
              { id: '2', avatar: 'https://v0.dev/placeholder.svg' },
            ]}
          />

          <div className="mt-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">
                Welcome back, {user?.firstName || 'User'}
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">To-Do</h2>
                  <button 
                    onClick={() => {
                      setEditingTask(null);
                      setIsAddTaskModalOpen(true);
                    }} 
                    className="text-[#FF7B7B]"
                  >
                    + Add task
                  </button>
                </div>
                <div className="space-y-4">

     {tasks.filter(task => task.status === 'Not Started').map(task => (
                    <TaskCard 
                      key={task.id || crypto.randomUUID()} 
                      task={task} 
                      onEdit={() => {
                        setEditingTask(task);
                        setIsAddTaskModalOpen(true);
                      }}
                      onDelete={() => handleDeleteTask(task.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <TaskStatus status={calculateTaskStatus()} />

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4">In Progress Task</h2>
                  <div className="space-y-4">
                    {tasks.filter(task => task.status === 'In Progress').map(task => (
                      <TaskCard 
                        key={task.id || crypto.randomUUID()} 
                        task={task} 
                        onEdit={() => {
                          setEditingTask(task);
                          setIsAddTaskModalOpen(true);
                        }}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    ))}
                  </div>

                  <Link to="/inprogress">
                    <p className='text-[#8a8a8a] text-sm text-center cursor-pointer py-4'>Open More Tasks</p>
                  </Link>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4">Completed Task</h2>
                  <div className="space-y-4">
                    {tasks.filter(task => task.status === 'Completed').map(task => (
                      <TaskCard 
                        key={task.id || crypto.randomUUID()} 
                        task={task} 
                        onEdit={() => {
                          setEditingTask(task);
                          setIsAddTaskModalOpen(true);
                        }}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    ))}
                  </div>

                  <Link to="/completed">
                    <p className='text-[#8a8a8a] text-sm text-center cursor-pointer py-4'>Open More Tasks</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Task Modal */}
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onOpenChange={setIsAddTaskModalOpen}
          onAddTask={handleAddTask}
          initialTask={editingTask}
          onUpdateTask={handleEditTask}
        />
      </main>
    </div>
  )
}
