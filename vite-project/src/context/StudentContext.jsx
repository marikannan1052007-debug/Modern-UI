import { useEffect, useState } from "react"

import { StudentContext } from "./Student-context"


export function StudentProvider({ children }) {
  // Load from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("student-tasks")

    return savedTasks
      ? JSON.parse(savedTasks)
        : []
  })
  const [settings, setSettings] =
  useState(() => {
    const saved =
      localStorage.getItem(
        "student-settings"
      )

    return saved
      ? JSON.parse(saved)
      : {
          name: "John Doe",
          email: "",
          course:
            "Computer Science",
          semester: "6",
        }
  })
  const [searchQuery, setSearchQuery] =
  useState("")

  // Save whenever tasks change
  useEffect(() => {
    localStorage.setItem(
      "student-tasks",
      JSON.stringify(tasks)
    )
  }, [tasks])
  useEffect(() => {
  localStorage.setItem(
    "student-settings",
    JSON.stringify(settings)
  )
}, [settings])

  return (
    <StudentContext.Provider
      value={{
        tasks,
        setTasks,
        searchQuery,
        setSearchQuery,
        settings,
        setSettings
      }}
    >
      
      {children}
    </StudentContext.Provider>
    
  )
  
}