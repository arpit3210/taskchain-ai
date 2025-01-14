import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from "@clerk/clerk-react";
import { ITask } from '@/models/Task';
import { useTasks } from '@/hooks/useTasks';
import { createTask } from '@/lib/api';
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
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";

// Zod Schema for Task Validation
const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(['Low', 'Moderate', 'High'], {
    errorMap: () => ({ message: "Please select a valid priority" })
  }),
  status: z.enum(['Not Started', 'In Progress', 'Completed'], {
    errorMap: () => ({ message: "Please select a valid status" })
  }),
  dueDate: z.date().optional(),
  image: z.string().url("Invalid image URL").optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface AddTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask?: (taskData: Partial<ITask>) => void;
}

export function AddTaskModal({ 
  isOpen, 
  onOpenChange,
  onAddTask
}: AddTaskModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useUser();
  const { addTask, reloadTasks } = useTasks();
  const { toast } = useToast();

  const { 
    control, 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 'Moderate',
      status: 'Not Started'
    }
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Image selected:', file);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: TaskFormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a task",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Submitting task with image:', imageFile);
      
      // Prepare task data
      const taskToCreate: Partial<ITask> = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        createdOn: new Date(),
        dueDate: data.dueDate,
        userId: user.id
      };

      try {
        // Use local addTask method from useTasks hook
        const newTask = await addTask(taskToCreate, imageFile);
        
        // Call onAddTask prop if provided
        if (onAddTask) {
          onAddTask(newTask);
        }

        // Reset form
        reset();
        setImageFile(null);
        setImagePreview(null);
        onOpenChange(false);

        // Show success toast
        toast({
          title: "Success",
          description: "Task created successfully!",
          variant: "default"
        });
      } catch (error: any) {
        // Detailed error handling
        if (error.response) {
          switch (error.response.status) {
            case 409:
              toast({
                title: "Duplicate Task",
                description: error.response.data.suggestion || "A similar task already exists.",
                variant: "default"
              });
              break;
            case 400:
              toast({
                title: "Invalid Task",
                description: error.response.data.message || "Invalid task data.",
                variant: "destructive"
              });
              break;
            default:
              toast({
                title: "Error",
                description: error.response.data.message || "Failed to add task. Please try again.",
                variant: "destructive"
              });
          }
        } else {
          // Network error or other unexpected errors
          toast({
            title: "Network Error",
            description: "Unable to connect to the server. Please check your internet connection.",
            variant: "destructive"
          });
        }
        
        console.error('Task creation error:', error);
      }
    } catch (generalError) {
      console.error('Unexpected error:', generalError);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white rounded-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Create New Task
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Fill in the details for your new task
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Input */}
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

          {/* Description */}
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

          {/* Priority & Status */}
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
                    defaultValue={field.value}
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
                    defaultValue={field.value}
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

          {/* Due Date */}
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

          {/* Image Upload */}
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

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}