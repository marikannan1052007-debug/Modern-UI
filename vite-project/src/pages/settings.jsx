import {
  User,
  Target,
  Bell,
  Database,
  Moon,
} from "lucide-react"

import { useStudent } from "../hooks/useStudent"

function Settings() {
  const {
    settings,
    setSettings,
  } = useStudent()

  const updateField = (
    key,
    value
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const exportData = () => {
    const data = {
      tasks: JSON.parse(
        localStorage.getItem(
          "student-tasks"
        ) || "[]"
      ),
      settings,
    }

    const blob = new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    )

    const url =
      URL.createObjectURL(blob)

    const a =
      document.createElement("a")

    a.href = url
    a.download =
      "studentos-backup.json"

    a.click()

    URL.revokeObjectURL(url)
  }

  const resetData = () => {
    const confirmed = window.confirm(
      "Delete all StudentOS data?"
    )

    if (!confirmed) return

    localStorage.removeItem(
      "student-tasks"
    )

    localStorage.removeItem(
      "student-settings"
    )

    window.location.reload()
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Settings
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your profile,
          study goals and preferences.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white dark:bg-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <User
              size={22}
              className="text-indigo-500"
            />

            <h2 className="text-xl font-bold dark:text-white">
              Profile
            </h2>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={settings.name}
              onChange={(e) =>
                updateField(
                  "name",
                  e.target.value
                )
              }
              placeholder="Name"
              className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-[#111827]
              dark:border-white/10
              dark:text-white
            "
            />

            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
              placeholder="Email"
              className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-[#111827]
              dark:border-white/10
              dark:text-white
            "
            />

            <input
              type="text"
              value={settings.course}
              onChange={(e) =>
                updateField(
                  "course",
                  e.target.value
                )
              }
              placeholder="Course"
              className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-[#111827]
              dark:border-white/10
              dark:text-white
            "
            />

            <input
              type="text"
              value={
                settings.semester
              }
              onChange={(e) =>
                updateField(
                  "semester",
                  e.target.value
                )
              }
              placeholder="Semester"
              className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-[#111827]
              dark:border-white/10
              dark:text-white
            "
            />
          </div>
        </div>

        {/* Study Goals */}
        <div className="bg-white dark:bg-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Target
              size={22}
              className="text-emerald-500"
            />

            <h2 className="text-xl font-bold dark:text-white">
              Study Goals
            </h2>
          </div>

          <div className="space-y-4">
            <input
              type="number"
              value={
                settings.dailyGoal
              }
              onChange={(e) =>
                updateField(
                  "dailyGoal",
                  Number(
                    e.target.value
                  )
                )
              }
              placeholder="Daily Goal"
              className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-[#111827]
              dark:border-white/10
              dark:text-white
            "
            />

            <input
              type="number"
              value={
                settings.weeklyGoal
              }
              onChange={(e) =>
                updateField(
                  "weeklyGoal",
                  Number(
                    e.target.value
                  )
                )
              }
              placeholder="Weekly Goal"
              className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-[#111827]
              dark:border-white/10
              dark:text-white
            "
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Bell
              size={22}
              className="text-orange-500"
            />

            <h2 className="text-xl font-bold dark:text-white">
              Notifications
            </h2>
          </div>

          <label className="flex items-center justify-between">
            <span className="dark:text-white">
              Enable Notifications
            </span>

            <input
              type="checkbox"
              checked={
                settings.notifications
              }
              onChange={(e) =>
                updateField(
                  "notifications",
                  e.target.checked
                )
              }
            />
          </label>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Moon
              size={22}
              className="text-indigo-500"
            />

            <h2 className="text-xl font-bold dark:text-white">
              Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="dark:text-white">
                Show Streak
              </span>

              <input
                type="checkbox"
                checked={
                  settings.showStreak
                }
                onChange={(e) =>
                  updateField(
                    "showStreak",
                    e.target.checked
                  )
                }
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="dark:text-white">
                Show Analytics
              </span>

              <input
                type="checkbox"
                checked={
                  settings.showAnalytics
                }
                onChange={(e) =>
                  updateField(
                    "showAnalytics",
                    e.target.checked
                  )
                }
              />
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-white/5 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Database
            size={22}
            className="text-red-500"
          />

          <h2 className="text-xl font-bold dark:text-white">
            Data Management
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={exportData}
            className="
            px-5
            py-3
            rounded-xl
            bg-indigo-600
            text-white
            hover:bg-indigo-700
          "
          >
            Export Data
          </button>

          <button
            onClick={resetData}
            className="
            px-5
            py-3
            rounded-xl
            bg-red-600
            text-white
            hover:bg-red-700
          "
          >
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings