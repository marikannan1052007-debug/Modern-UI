import { useContext } from "react"

import {
  Moon,
  Sun,
} from "lucide-react"

import { ThemeContext } from "../../context/theme-context"

function ThemeToggle() {
  const { theme, setTheme } =
    useContext(ThemeContext)

  const toggleTheme = () => {
    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="
      h-11
      w-11
      rounded-2xl
      border
      border-slate-200
      dark:border-white/10
      bg-white/70
      dark:bg-[#1e293b]/70
      backdrop-blur-xl
      flex
      items-center
      justify-center
      hover:bg-slate-100
      dark:hover:bg-white/10
      transition-all
      duration-300
      shadow-sm
      text-gray-500
    "
    >
      {theme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  )
}

export default ThemeToggle