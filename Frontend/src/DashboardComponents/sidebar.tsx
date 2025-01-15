import { useState } from 'react'
import { HomeIcon, BellIcon, ListIcon as ListTaskIcon, TypeIcon as CategoryIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { User } from '@/types/dashboard'

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', active: true },
    { icon: BellIcon, label: 'Vital Task' },
    { icon: ListTaskIcon, label: 'My Task' },
    { icon: CategoryIcon, label: 'Task Categories' },
    { icon: SettingsIcon, label: 'Settings' },
    { icon: HelpCircleIcon, label: 'Help' },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-50 bg-[#FF7B7B] text-white p-2 rounded-md"
      >
        {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 w-72 bg-[#FF7B7B] min-h-screen p-6 text-white flex flex-col",
        "transform transition-transform duration-300 ease-in-out",
        "md:translate-x-0", // Always visible on medium and larger screens
        isOpen ? "translate-x-0" : "-translate-x-full" // Slide in/out on mobile
      )}>
        <div className="text-2xl font-semibold mb-8">
          <span className="text-white">Dash</span>
          <span className="text-black">board</span>
        </div>
        
        <div className="flex flex-col items-center mb-8">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-20 h-20 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm opacity-80">{user.email}</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={toggleSidebar} // Close sidebar when an item is selected on mobile
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    item.active ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          onClick={toggleSidebar} // Close sidebar when logout is clicked on mobile
          className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-lg mt-auto"
        >
          <LogOutIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={toggleSidebar} 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}
    </>
  )
}
