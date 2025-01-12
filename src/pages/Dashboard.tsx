import { useState } from 'react'
import { SlidingSidebar } from "@/components/sliding-sidebar";
import { Header } from "@/DashboardComponents/header";
import { TaskCard } from "@/DashboardComponents/task-card";
import { TaskStatus } from "@/DashboardComponents/task-status";

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
        // Add more tasks...
      ])
    
      const [taskStatus] = useState<TaskStatus>({
        completed: 84,
        inProgress: 46,
        notStarted: 13
      })

  return (
    <div className="min-h-screen bg-gray-100">
      <SlidingSidebar user={user} />
      <main className="pl-20 lg:pl-72 min-h-screen">
      <div className="flex-1">
        <Header 
          date="20/06/2023"
          teamMembers={[
            { id: '1', avatar: 'https://v0.dev/placeholder.svg' },
            { id: '2', avatar: 'https://v0.dev/placeholder.svg' },
            // Add more team members...
          ]}
        />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">
              Welcome back, Sundar 👋
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">To-Do</h2>
                <button className="text-[#FF7B7B]">+ Add task</button>
              </div>
              <div className="space-y-4">
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <TaskStatus status={taskStatus} />
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Completed Task</h2>
                {/* Add completed tasks here */}
              </div>
            </div>
          </div>
        </main>
      </div>
      </main>
    </div>
  )
}

