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
      title: "Implement Web3 login using MetaMask",
      description: "Research and implement a way to use MetaMask to login to the web3 application.",
      priority: 'High',
      status: 'Not Started',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '2',
      title: "Develop NFT minting feature",
      description: "Research and develop a feature to mint NFTs on the Polygon blockchain.",
      priority: 'High',
      status: 'In Progress',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '3',
      title: "Create a Web3 wallet using ethers.js",
      description: "Research and develop a web3 wallet using ethers.js to interact with the Ethereum blockchain.",
      priority: 'Moderate',
      status: 'Not Started',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '4',
      title: "Fix Web3.js compatibility issue with Polygon",
      description: "Research and fix a compatibility issue between Web3.js and the Polygon blockchain.",
      priority: 'Low',
      status: 'Completed',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '5',
      title: "Implement Web3 storage using IPFS",
      description: "Research and implement a way to store data on the InterPlanetary File System (IPFS) using Web3.",
      priority: 'Moderate',
      status: 'Not Started',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '6',
      title: "Research and implement Web3 authentication using uPort",
      description: "Research and implement a way to use uPort to authenticate users on the web3 application.",
      priority: 'Low',
      status: 'Not Started',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '7',
      title: "Develop a Web3 dapp using React and ethers.js",
      description: "Research and develop a web3 application using React and ethers.js to interact with the Ethereum blockchain.",
      priority: 'Moderate',
      status: 'Not Started',
      createdOn: '20/06/2023',
      image: 'https://v0.dev/placeholder.svg'
    },
    {
      id: '8',
      title: "Research and implement Web3 analytics using Google Analytics",
      description: "Research and implement a way to use Google Analytics to track analytics on the web3 application.",
      priority: 'Low',
      status: 'Not Started',
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
                  <h2 className="text-lg font-semibold">To-Do</h2>
                  {/* Add Task Button */}
                  <button onClick={() => setIsAddTaskModalOpen(true)} className="text-[#FF7B7B]">+ Add task</button>

                </div>
                <div className="space-y-4">
                  {tasks.filter(task => task.status === 'Not Started').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <TaskStatus status={taskStatus} />



                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4">In Progress Task</h2>
                  <div className="space-y-4">
                    {tasks.filter(task => task.status === 'In Progress').map(task => (
                      <TaskCard key={task.id} task={task} />
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
