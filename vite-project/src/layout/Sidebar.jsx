import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
  X,
} from "lucide-react"

import { NavLink } from "react-router-dom"

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },

  {
    icon: CheckSquare,
    label: "Tasks",
    path: "/tasks",
  },

  {
    icon: BarChart3,
    label: "Analytics",
    path: "/analytics",
  },

  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
]

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <aside
      className={`
      fixed
      md:static
      top-0
      left-0
      z-40
      h-screen
      w-64
      flex
      flex-col
      bg-[#081028]
      text-white
      border-r
      border-white/10
      transform
      transition-transform
      duration-300
      ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"
      }
    `}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden absolute right-4 top-4">
        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
          p-2
          rounded-xl
          hover:bg-white/10
          transition
        "
        >
          <X size={22} />
        </button>
      </div>

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight">
          StudentOS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                transition-all
                duration-300
                hover:translate-x-1
                ${
                  isActive
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom Card */}
      <div className="p-4">
        <div
          className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-indigo-500
          via-violet-500
          to-cyan-500
          p-5
        "
        >
          {/* Glow */}
          <div className="absolute -top-10 -right-10 h-28 w-28 bg-white/20 rounded-full blur-2xl" />

          <div className="relative z-10">
            <h3 className="font-bold text-lg">
              Stay Consistent
            </h3>

            <p className="text-sm text-white/80 mt-2 leading-relaxed">
              Complete your daily goals and
              maintain your productivity
              streak.
            </p>

            
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar