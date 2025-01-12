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
        "p-6",
        collapsed ? "text-center" : ""
      )}>
        <h1 className="text-2xl font-semibold">
          <span className="text-white">Dash</span>
          <span className={cn(
            "text-black",
            collapsed ? "hidden" : "inline"
          )}>board</span>
        </h1>
      </div>

      {/* Profile */}
      <div className={cn(
        "flex flex-col items-center px-6 py-4",
        collapsed ? "px-2" : ""
      )}>
        <div className="relative w-16 h-16 mb-4">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {!collapsed && (
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
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="w-5 h-5 text-white" />
                {!collapsed && <span className="text-white">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <button 
        className={cn(
          "absolute bottom-8 flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors",
          collapsed ? "left-1/2 -translate-x-1/2" : "left-6"
        )}
      >
        <LogOutIcon className="w-5 h-5 text-white" />
        {!collapsed && <span className="text-white">Logout</span>}
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
          "h-screen bg-[#FF7B7B] transition-all duration-300 ease-in-out fixed top-0 left-0 z-50",
          // Desktop behavior
          "hidden lg:block", // Hidden on mobile, visible on large screens
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Toggle button for desktop */}
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

        {renderSidebarContent(isCollapsed)}
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 w-72 bg-[#FF7B7B] h-screen z-50 transition-transform duration-300 ease-in-out",
          "lg:hidden", // Only visible on mobile
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {renderSidebarContent(false)}
      </div>

      {/* Mobile Overlay */}
      {(isMobile && isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  )
}
