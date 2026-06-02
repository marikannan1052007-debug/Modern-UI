import { useMemo, useState } from "react"

import { motion } from "framer-motion"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
  "#14b8a6",
]

function ProductivityPieChart({ tasks }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Dynamic Analytics
  const data = useMemo(() => {
    const subjectMap = {}

    tasks.forEach((task) => {
      if (subjectMap[task.category]) {
        subjectMap[task.category] += task.hours
      } else {
        subjectMap[task.category] = task.hours
      }
    })

    return Object.keys(subjectMap).map(
      (subject) => ({
        name: subject,
        value: subjectMap[subject],
      })
    )
  }, [tasks])

  // Total Hours
  const totalHours = useMemo(() => {
    return data.reduce(
      (acc, item) => acc + item.value,
      0
    )
  }, [data])

  // Active Subject
  const activeSubject =
    data[activeIndex] || {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="
      relative
      overflow-hidden
      h-[500px]
      bg-white/80
      dark:bg-white/5
      backdrop-blur-2xl
      rounded-[32px]
      p-6
      border
      border-white/20
      dark:border-white/10
      shadow-xl
    "
    >
      {/* Glow */}
      <div className="absolute -top-24 -right-24 h-52 w-52 bg-indigo-500/20 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <h2 className="text-2xl font-bold dark:text-white">
          Subject Analytics
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Dynamic study hours distribution
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-400">
          No study data available
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="relative h-[280px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  data={data}
                  innerRadius={85}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  onMouseEnter={(_, index) =>
                    setActiveIndex(index)
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                      style={{
                        transition:
                          "all 0.3s ease",
                        filter:
                          activeIndex ===
                          index
                            ? "brightness(1.1)"
                            : "brightness(1)",
                      }}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Analytics */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.h2
                key={totalHours}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-5xl font-bold dark:text-white"
              >
                {totalHours}h
              </motion.h2>

              <p className="text-sm text-gray-500 mt-1">
                Total Study
              </p>

              <div className="mt-4 text-center">
                <h4 className="font-semibold text-indigo-600">
                  {activeSubject.name}
                </h4>

                <p className="text-xs text-gray-500">
                  {activeSubject.value} hours
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 dark:border-white/10 my-5" />

          {/* Dynamic Legends */}
          <div className="space-y-3">
            {data.map((item, index) => {
              const percentage = (
                (item.value /
                  totalHours) *
                100
              ).toFixed(0)

              return (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  onHoverStart={() =>
                    setActiveIndex(index)
                  }
                  className={`
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3
                  cursor-pointer
                  transition-all
                  duration-300
                  ${
                    activeIndex === index
                      ? "bg-slate-100 dark:bg-white/10"
                      : "hover:bg-slate-50 dark:hover:bg-white/5"
                  }
                `}
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[
                            index %
                              COLORS.length
                          ],
                      }}
                    />

                    <div>
                      <h4 className="font-medium dark:text-white">
                        {item.name}
                      </h4>

                      <p className="text-xs text-gray-500">
                        {percentage}% of study
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {item.value}h
                  </span>
                </motion.div>
              )
            })}
          </div>
        </>
      )}
    </motion.div>
  )
}

export default ProductivityPieChart