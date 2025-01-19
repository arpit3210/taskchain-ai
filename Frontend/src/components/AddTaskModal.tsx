import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from "@clerk/clerk-react";
import { ITask } from '@/models/Task';
import { useTasks } from '@/hooks/useTasks';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CalendarIcon, ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(['Low', 'Moderate', 'High']),
  status: z.enum(['Not Started', 'In Progress', 'Completed']),
  dueDate: z.date().optional(),
  image: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface AddTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask?: (taskData: Partial<ITask>) => void;
  initialTask?: ITask | Task | null;  // Allow both ITask and Task
  onUpdateTask?: (taskData: ITask) => void;
}

export const AddTaskModal = ({
  isOpen,
  onOpenChange,
  onAddTask,
  initialTask,
  onUpdateTask
}: AddTaskModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { user } = useUser();
  const { addTask } = useTasks();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 'Moderate',
      status: 'Not Started'
    }
  });

  useEffect(() => {
    if (initialTask) {
      // Convert Task to ITask if needed
      const taskToEdit: ITask = 'id' in initialTask ? {
        _id: initialTask.id,
        title: initialTask.title,
        description: initialTask.description,
        priority: initialTask.priority,
        status: initialTask.status,
        createdOn: initialTask.createdOn,
        dueDate: initialTask.dueDate,
        image: initialTask.image,
        userId: initialTask.userId
      } : initialTask;

      setValue('title', taskToEdit.title);
      setValue('description', taskToEdit.description || '');
      setValue('priority', taskToEdit.priority as 'Low' | 'Moderate' | 'High');
      setValue('status', taskToEdit.status as 'Not Started' | 'In Progress' | 'Completed');
      
      if (taskToEdit.dueDate) {
        setValue('dueDate', new Date(taskToEdit.dueDate));
      }

      if (taskToEdit.image) {
        setImagePreview(taskToEdit.image);
      }

      reset({
        priority: taskToEdit.priority as 'Low' | 'Moderate' | 'High',
        status: taskToEdit.status as 'Not Started' | 'In Progress' | 'Completed'
      });
      setImagePreview(taskToEdit.image || null);
      setImageFile(null);
    }
  }, [initialTask, setValue, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const onSubmit = handleSubmit(async (data: TaskFormData) => {
    if (isSubmitting || !user) return;

    setIsSubmitting(true);

    try {
      // Convert initial task to ITask if it's a Task
      const baseTask: ITask = initialTask && 'id' in initialTask ? {
        _id: initialTask.id,
        title: initialTask.title,
        description: initialTask.description,
        priority: initialTask.priority,
        status: initialTask.status,
        createdOn: initialTask.createdOn || new Date(),
        dueDate: initialTask.dueDate,
        image: initialTask.image,
        userId: initialTask.userId
      } as ITask : initialTask as ITask;

      if (baseTask && onUpdateTask) {
        const updatedTask: ITask = {
          ...baseTask,
          title: data.title,
          description: data.description || '',
          priority: data.priority,
          status: data.status,
          dueDate: data.dueDate,
          image: imagePreview || baseTask.image,
          updatedAt: new Date()
        };

        await onUpdateTask(updatedTask);
        toast({
          title: "Success",
          description: "Task updated successfully!"
        });
      } else if (onAddTask) {
        const newTask: Partial<ITask> = {
          title: data.title,
          description: data.description || '',
          priority: data.priority,
          status: data.status,
          createdOn: new Date(),
          dueDate: data.dueDate,
          userId: user.id,
          image: imagePreview
        };

        const createdTask = await addTask(newTask, imageFile);
        onAddTask(createdTask);
        toast({
          title: "Success",
          description: "Task created successfully!"
        });
      }

      reset();
      setImageFile(null);
      setImagePreview(null);
      onOpenChange(false);
    } catch (error: any) {
      console.error('Task operation failed:', error);
      toast({
        title: "warning",
        description: "Failed to process task"
      });
      
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white rounded-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {initialTask ? 'Update the details of your task' : 'Fill in the details for your new task'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Form fields remain the same */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <Input
              {...register('title')}
              placeholder="Enter task title"
              className={cn(
                "mt-1 w-full",
                errors.title && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              {...register('description')}
              placeholder="Add task details (optional)"
              className="mt-1 w-full min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Low', 'Moderate', 'High'].map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Not Started', 'In Progress', 'Completed'].map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date (Optional)
            </label>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Image (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="task-image-upload"
              />
              <label
                htmlFor="task-image-upload"
                className="flex items-center space-x-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                <ImageIcon className="w-5 h-5 text-gray-600" />
                <span>Upload Image</span>
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Task Preview"
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting}
          >
            {initialTask ? 'Update Task' : 'Create Task'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};