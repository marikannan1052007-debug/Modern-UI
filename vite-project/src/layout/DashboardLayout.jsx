import { useState } from "react"

import { Menu } from "lucide-react"

import Sidebar from "./Sidebar"
import Header from "./Header"

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb] dark:bg-[#0b1120]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
          fixed
          inset-0
          bg-black/50
          z-30
          md:hidden
        "
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 h-16 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1120]">
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
            p-2
            rounded-xl
            hover:bg-slate-100
            dark:hover:bg-white/10
            transition
          "
          >
            <Menu className="dark:text-white" />
          </button>

          <h1 className="font-bold text-xl dark:text-white">
            StudentOS
          </h1>

          <div />
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Content */}
        <main
          className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          p-4 md:p-6
          bg-gradient-to-br
          from-slate-50
          to-slate-100
          dark:from-[#0b1120]
          dark:to-[#111827]
        "
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout