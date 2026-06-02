import {
  useEffect,
  useState,
} from "react"

import { ThemeContext } from "../context/theme-context"

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      "light"
  )

  useEffect(() => {
    const root =
      window.document.documentElement

    root.classList.remove(
      "light",
      "dark"
    )

    root.classList.add(theme)

    localStorage.setItem(
      "theme",
      theme
    )
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}