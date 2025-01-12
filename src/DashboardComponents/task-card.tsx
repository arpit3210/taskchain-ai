interface TaskCardProps {
    task: Task;
  }
  
  export function TaskCard({ task }: TaskCardProps) {
    const statusColors = {
      'Not Started': 'text-red-500',
      'In Progress': 'text-blue-500',
      'Completed': 'text-green-500'
    }
  
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div>
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
            Created on {task.createdOn}
          </div>
        </div>
      </div>
    )
  }
  
  