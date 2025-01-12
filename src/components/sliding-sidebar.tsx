"use client"

import { useState, useEffect } from "react"
import { HomeIcon, BellIcon, ListIcon, TypeIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, ChevronRightIcon, MenuIcon, XIcon } from 'lucide-react'
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
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Tailwind's lg breakpoint
    }
    
    // Check on mount and add resize listener
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", active: true },
    { icon: BellIcon, label: "Vital Task" },
    { icon: ListIcon, label: "My Task" },
    { icon: TypeIcon, label: "Task Categories" },
    { icon: SettingsIcon, label: "Settings" },
    { icon: HelpCircleIcon, label: "Help" },
  ]

  // Toggle for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Render mobile menu button
  const renderMobileMenuToggle = () => (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden fixed top-4 left-4 z-[60] bg-[#FF7B7B] text-white p-2 rounded-md shadow-lg"
    >
      {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
    </button>
  )

// Render sidebar content
const renderSidebarContent = (collapsed: boolean) => (
    <>
      {/* Logo */}
      <div className={cn(
        "p-6 bg-white/10 backdrop-blur-sm",
        collapsed ? "text-center" : ""
      )}>
        <h1 className="text-2xl font-bold text-white">
          {/* <span>Task</span>
          <span className="text-black">Chain</span> */}
        </h1>
      </div>

      {/* Profile */}
      <div className={cn(
        "flex flex-col items-center px-6 py-4 bg-white/5 backdrop-blur-sm",
        collapsed ? "px-2" : ""
      )}>
        <div className="relative w-20 h-20 mb-4 ring-4 ring-white/30 rounded-full">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {!collapsed && (
          <>
            <h2 className="text-white text-lg font-semibold mt-2">{user.name}</h2>
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
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300",
                  "hover:bg-white/20 active:scale-95",
                  item.active 
                    ? "bg-white/20 text-white" 
                    : "text-white/80 hover:text-white",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <button 
        className={cn(
          "absolute bottom-8 flex items-center space-x-3 px-4 py-3",
          "hover:bg-white/20 rounded-lg transition-all duration-300",
          "text-white/80 hover:text-white active:scale-95",
          collapsed ? "left-1/2 -translate-x-1/2" : "left-6"
        )}
      >
        <LogOutIcon className="w-5 h-5" />
        {!collapsed && <span>Logout</span>}
      </button>
    </>
  )

  return (
    <>
      {/* Mobile Menu Toggle */}
      {renderMobileMenuToggle()}

      {/* Desktop/Tablet Sidebar */}
      <div
        className={cn(
          "h-screen transition-all duration-300 ease-in-out fixed top-0 left-0 z-50",
          "hidden lg:block", // Hidden on mobile, visible on large screens
          "bg-gradient-to-br from-[#7E69AB] via-[#33C3F0] to-[#0EA5E9]", // Matching gradient
          "shadow-2xl", // Added shadow for depth
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Toggle button for desktop */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute z-50 -right-3 top-8 bg-white/20 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-white/30 transition-colors"
        >
          <ChevronRightIcon 
            className={cn(
              "h-4 w-4 text-white transition-transform duration-300",
              isCollapsed ? "rotate-0" : "rotate-180"
            )} 
          />
        </button>

        {renderSidebarContent(isCollapsed)}
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 w-72 h-screen z-50 transition-transform duration-300 ease-in-out",
          "lg:hidden", // Only visible on mobile
          "bg-gradient-to-br from-[#7E69AB] via-[#33C3F0] to-[#0EA5E9]", // Matching gradient
          "shadow-2xl", // Added shadow for depth
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {renderSidebarContent(false)}
      </div>

      {/* Mobile Overlay */}
      {(isMobile && isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  )
}
