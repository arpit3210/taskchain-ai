"use client"

import { useState } from "react"
import { HomeIcon, BellIcon, ListIcon, TypeIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SlidingSidebarProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  }
}

export function SlidingSidebar({ user }: SlidingSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", active: true },
    { icon: BellIcon, label: "Vital Task" },
    { icon: ListIcon, label: "My Task" },
    { icon: TypeIcon, label: "Task Categories" },
    { icon: SettingsIcon, label: "Settings" },
    { icon: HelpCircleIcon, label: "Help" },
  ]

  return (
    <div className="relative">
      <div
        className={cn(
          "h-screen bg-[#FF7B7B] transition-all duration-300 ease-in-out fixed top-0 left-0 z-50",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChevronRightIcon 
            className={cn(
              "h-4 w-4 text-[#FF7B7B] transition-transform duration-300",
              isCollapsed ? "rotate-0" : "rotate-180"
            )} 
          />
        </button>

        {/* Logo */}
        <div className={cn(
          "p-6",
          isCollapsed ? "text-center" : ""
        )}>
          <h1 className="text-2xl font-semibold">
            <span className="text-white">Dash</span>
            <span className={cn(
              "text-black",
              isCollapsed ? "hidden" : "inline"
            )}>board</span>
          </h1>
        </div>

        {/* Profile */}
        <div className={cn(
          "flex flex-col items-center px-6 py-4",
          isCollapsed ? "px-2" : ""
        )}>
          <div className="relative w-16 h-16 mb-4">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {!isCollapsed && (
            <>
              <h2 className="text-white text-lg font-semibold">{user.name}</h2>
              <p className="text-white/80 text-sm">{user.email}</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-4 mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    item.active ? "bg-white/10" : "hover:bg-white/5",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <item.icon className="w-5 h-5 text-white" />
                  {!isCollapsed && <span className="text-white">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <button 
          className={cn(
            "absolute bottom-8 flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors",
            isCollapsed ? "left-1/2 -translate-x-1/2" : "left-6"
          )}
        >
          <LogOutIcon className="w-5 h-5 text-white" />
          {!isCollapsed && <span className="text-white">Logout</span>}
        </button>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </div>
  )
}

