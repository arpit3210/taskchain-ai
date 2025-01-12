import type { TaskStatus } from '@/types/dashboard'

interface TaskStatusProps {
    status: TaskStatus;
  }
  
  export function TaskStatus({ status }: TaskStatusProps) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Task Status</h2>
        <div className="flex justify-between items-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="48"
                cy="48"
              />
              <circle
                className="text-green-500"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - status.completed / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="48"
                cy="48"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-xl text-center font-bold">{status.completed}%</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
          </div>
  
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="48"
                cy="48"
              />
              <circle
                className="text-blue-500"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - status. inProgress / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="48"
                cy="48"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-xl text-center font-bold">{status. inProgress}%</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="48"
                cy="48"
              />
              <circle
                className="text-red-500"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - status.notStarted / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="48"
                cy="48"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-xl text-center font-bold">{status.notStarted}%</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
          </div>
          {/* Repeat similar circles for In Progress and Not Started */}
        </div>
      </div>
    )
  }
  
  