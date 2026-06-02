function ActivityPanel({ tasks }) {
  return (
    <div
      className="
      h-[500px]
      w-full
      bg-white/80
      dark:bg-white/5
      backdrop-blur-xl
      rounded-3xl
      p-6
      border
      border-white/20
      dark:border-white/10
      shadow-sm
      flex
      flex-col
    "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white">
          Study Timeline
        </h2>

        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-5">
        {tasks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            No activity yet
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="
              flex
              items-start
              justify-between
              gap-4
              border-b
              border-slate-100
              dark:border-white/5
              pb-4
            "
            >
              {/* Left */}
              <div className="min-w-0">
                <h4 className="font-medium dark:text-white truncate">
                  {task.name}
                </h4>

                <p className="text-sm text-gray-500 truncate">
                  {task.subject}
                </p>
              </div>

              {/* Right */}
              <span className="text-sm text-gray-400 whitespace-nowrap">
                {task.createdAt}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ActivityPanel