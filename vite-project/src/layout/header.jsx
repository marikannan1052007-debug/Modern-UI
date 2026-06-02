import { Menu } from "lucide-react"

import ThemeToggle from "../components/shared/ThemeToggle"
import { useStudent } from "../hooks/useStudent"

function Header({ setSidebarOpen }) {
  const { settings } = useStudent()

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  )

  const hour = new Date().getHours()

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening"

  return (
    <header
      className="
      sticky
      top-0
      z-50
      h-20
      bg-white/80
      dark:bg-[#0f172a]/80
      backdrop-blur-2xl
      border-b
      border-slate-200
      dark:border-white/10
      flex
      items-center
      justify-between
      px-4
      lg:px-6
    "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
          h-11
          w-11
          rounded-2xl
          border
          border-slate-200
          dark:border-white/10
          flex
          items-center
          justify-center
          bg-white
          dark:bg-[#1e293b]
          shadow-sm
          hover:bg-slate-100
          dark:hover:bg-white/10
          transition-all
        "
        >
          <Menu size={20} />
        </button>

        {/* Greeting */}
        <div>
          <h2
            className="
            text-lg
            md:text-xl
            font-bold
            dark:text-white
          "
          >
            {greeting},{" "}
            {settings?.name ||
              "Student"}{" "}
            
          </h2>

          <p
            className="
            text-xs
            md:text-sm
            text-gray-500
            dark:text-gray-400
          "
          >
            {today}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile */}
        <div
          className="
          flex
          items-center
          gap-3
        "
        >
          <div
            className="
            hidden
            sm:block
            text-right
          "
          >
            <h4
              className="
              font-semibold
              dark:text-white
            "
            >
              {settings?.name ||
                "Student"}
            </h4>

            <p
              className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
            >
              {settings?.course ||
                "Course"}
            </p>
          </div>

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="
            w-11
            h-11
            rounded-full
            object-cover
            ring-2
            ring-indigo-500
            shadow-md
          "
          />
        </div>
      </div>
    </header>
  )
}

export default Header