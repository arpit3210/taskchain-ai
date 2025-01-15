import { Task } from '@/types/dashboard'
import { Trash2Icon, EditIcon } from 'lucide-react'

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const statusColors = {
    'Not Started': 'text-red-500',
    'In Progress': 'text-blue-500',
    'Completed': 'text-green-500'
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-grow pr-4">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
        {task.image && (
          <img src={task.image} alt={task.title} className="w-16 h-16 rounded-lg object-cover" />
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="text-gray-500">Priority: </span>
          <span>{task.priority}</span>
        </div>
        <div>
          <span className="text-gray-500">Status: </span>
          <span className={statusColors[task.status]}>{task.status}</span>
        </div>
        <div className="text-gray-400">
          Created on {typeof task.createdOn === 'string' 
            ? new Date(task.createdOn).toLocaleDateString() 
            : task.createdOn instanceof Date 
              ? task.createdOn.toLocaleDateString() 
              : 'Unknown Date'}
        </div>
      </div>
      <div className="absolute top-2 right-2 flex space-x-2">
        {onEdit && (
          <button 
            onClick={onEdit} 
            className="text-blue-500 hover:text-blue-700 transition-colors"
            title="Edit Task"
          >
            <EditIcon size={18} />
          </button>
        )}
        {onDelete && (
          <button 
            onClick={onDelete} 
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete Task"
          >
            <Trash2Icon size={18} />
          </button>
        )}
      </div>
    </div>
  )
}