import { useStudent } from "../hooks/useStudent"

function Tasks() {
  const { tasks } = useStudent()

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  )

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  )

  const renderTasks = (taskList, color) => (
    <div className="space-y-4">
      {taskList.map((task) => (
        <div
          key={task.id}
          className="
          bg-white
          dark:bg-white/5
          rounded-2xl
          p-4
          shadow-sm
          border
          border-slate-100
          dark:border-white/5
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
        "
        >
          {/* Top */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold dark:text-white">
              {task.name}
            </h3>

            <span
              className={`text-xs px-3 py-1 rounded-full ${color}`}
            >
              {task.priority}
            </span>
          </div>

          {/* Subject */}
          <p className="text-sm text-gray-500 mt-2">
            {task.subject}
          </p>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-indigo-600">
              {task.category}
            </span>

            <span className="text-xs text-gray-400">
              {task.deadline}
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Task Workspace
        </h1>

        <p className="text-gray-500 mt-2">
          Organize your academic workflow.
        </p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* In Progress */}
        <div
          className="
          bg-amber-50
          dark:bg-amber-500/10
          rounded-3xl
          p-5
          border
          border-amber-100
          dark:border-amber-500/10
        "
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-xl dark:text-white">
              In Progress
            </h2>

            <span className="bg-amber-200 dark:bg-amber-500/20 px-3 py-1 rounded-full text-sm">
              {progress.length}
            </span>
          </div>

          {renderTasks(
            progress,
            "bg-amber-200 text-amber-700"
          )}
        </div>

        {/* Completed */}
        <div
          className="
          bg-emerald-50
          dark:bg-emerald-500/10
          rounded-3xl
          p-5
          border
          border-emerald-100
          dark:border-emerald-500/10
        "
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-xl dark:text-white">
              Completed
            </h2>

            <span className="bg-emerald-200 dark:bg-emerald-500/20 px-3 py-1 rounded-full text-sm">
              {completed.length}
            </span>
          </div>

          {renderTasks(
            completed,
            "bg-emerald-200 text-emerald-700"
          )}
        </div>
      </div>
    </div>
  )
}

export default Tasks