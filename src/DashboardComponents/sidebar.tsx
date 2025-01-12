import { HomeIcon, BellIcon, ListIcon as ListTaskIcon, TypeIcon as CategoryIcon, SettingsIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', active: true },
    { icon: BellIcon, label: 'Vital Task' },
    { icon: ListTaskIcon, label: 'My Task' },
    { icon: CategoryIcon, label: 'Task Categories' },
    { icon: SettingsIcon, label: 'Settings' },
    { icon: HelpCircleIcon, label: 'Help' },
  ]

  return (
    <div className="w-72 bg-[#FF7B7B] min-h-screen p-6 text-white flex flex-col">
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

      <button className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-lg mt-auto">
        <LogOutIcon className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  )
}

