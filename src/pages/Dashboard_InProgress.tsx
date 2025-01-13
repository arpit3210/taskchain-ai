import { useState } from 'react'
import { SlidingSidebar } from "@/components/sliding-sidebar";
import { Header } from "@/DashboardComponents/header";
import { TaskCard } from "@/DashboardComponents/task-card";
import { TaskStatus } from "@/DashboardComponents/task-status";
import { User, Task, TaskStatus as TaskStatusType } from "@/types/dashboard";
import { Link } from 'react-router-dom';
import { AddTaskModal } from '@/components/AddTaskModal';


export default function Dashboard() {
  const [user] = useState<User>({
    name: 'Sundar Gurung',
    email: 'sundar.gurung350@gmail.com',
    avatar: 'https://v0.dev/placeholder.svg'
  })

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: "Attend Nischal's Birthday Party",
      description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)....",
      priority: 'Moderate',
      status: 'Not Started',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '2',
      title: "Attend Nischal's Birthday Party",
      description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)....",
      priority: 'Moderate',
      status: 'Completed',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '3',
      title: "Attend Nischal's Birthday Party",
      description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)....",
      priority: 'Moderate',
      status: 'Not Started',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '4',
      title: "Attend Nischal's Birthday Party",
      description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)....",
      priority: 'Moderate',
      status: 'In Progress',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    // Add more tasks...
  ])

  const [taskStatus] = useState<TaskStatusType>({
    completed: 84,
    inProgress: 46,
    notStarted: 13
  })

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const handleAddTask = (taskData: any) => {
    // Implement task addition logic
    // This could involve calling an API, updating state, etc.
    console.log('New Task Added:', taskData);

    // Optionally close the modal after adding task
    setIsAddTaskModalOpen(false);
  };


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
              // Add more team members...
            ]}
          />

          <div className="mt-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">
                Welcome back, Sundar
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">In Progress Task</h2>
                  {/* Add Task Button */}
                  <button onClick={() => setIsAddTaskModalOpen(true)} className="text-[#FF7B7B]">+ Add task</button>
                </div>
                <div className="space-y-4">
                  {tasks.filter(task => task.status === 'In Progress').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <TaskStatus status={taskStatus} />

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4">ToDo Task</h2>
                  <div className="space-y-4">
                    {tasks.filter(task => task.status === 'Not Started').map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                  <Link to="/Dashboard">
                    <p className='text-[#8a8a8a] text-sm text-center cursor-pointer py-4'>Open More Tasks</p>
                  </Link>

                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4">Completed Task</h2>
                  <div className="space-y-4">
                    {tasks.filter(task => task.status === 'Completed').map(task => (
                      <TaskCard key={task.id} task={task} />
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


        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onOpenChange={setIsAddTaskModalOpen}
          onAddTask={handleAddTask}
        />


      </main>
    </div>
  )
}
