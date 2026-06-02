import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

function StudyChart({ tasks }) {
  // Dynamic Chart Data
  const chartData = tasks.map((task) => ({
    name: task.category,
    hours: task.hours,
  }))

  return (
    <div
      className="
      relative
      overflow-hidden
      bg-white/80
      dark:bg-white/5
      backdrop-blur-xl
      rounded-3xl
      p-6
      border
      border-white/20
      dark:border-white/10
      shadow-sm
    "
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold dark:text-white">
            Study Activity
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Weekly productivity insights
          </p>
        </div>

        {/* Analytics Badge */}
        <div className="rounded-2xl bg-indigo-500/10 px-4 py-2">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            +18% Growth
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            {/* Gradient */}
            <defs>
              <linearGradient
                id="studyGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#6366f1"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#6366f1"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeOpacity={0.1}
            />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                background: "rgba(15,23,42,0.95)",
                color: "white",
                padding: "12px",
              }}
              cursor={{
                stroke: "#6366f1",
                strokeWidth: 1,
              }}
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#6366f1"
              strokeWidth={4}
              fill="url(#studyGradient)"
              activeDot={{
                r: 7,
                strokeWidth: 2,
                fill: "#6366f1",
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StudyChart