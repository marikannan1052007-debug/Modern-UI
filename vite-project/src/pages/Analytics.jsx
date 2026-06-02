import {
  TrendingUp,
  Clock3,
  Target,
  Brain,
} from "lucide-react"

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

import { useStudent } from "../hooks/useStudent"

function RadialCard({
  title,
  value,
  color,
  subtitle,
}) {
  const data = [
    {
      name: title,
      value,
      fill: color,
    },
  ]

  return (
    <div
      className="
      bg-white/80
      dark:bg-white/5
      backdrop-blur-xl
      rounded-3xl
      p-6
      shadow-sm
      border
      border-white/20
      dark:border-white/10
    "
    >
      <h2 className="text-xl font-bold dark:text-white mb-4">
        {title}
      </h2>

      <div className="relative h-72">
        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />

            <RadialBar
              dataKey="value"
              cornerRadius={20}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div
          className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
        "
        >
          <h3 className="text-5xl font-bold dark:text-white">
            {value}%
          </h3>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

function Analytics() {
  const { tasks } = useStudent()

  const totalHours = tasks.reduce(
    (acc, task) =>
      acc + Number(task.hours || 0),
    0
  )

  const completed = tasks.filter(
    (task) =>
      task.status === "Completed"
  ).length

  const productivity =
    tasks.length > 0
      ? Math.round(
          (completed /
            tasks.length) *
            100
        )
      : 0

  const focusScore = Math.min(
    totalHours * 10,
    100
  )

  const weeklyGoal = Math.min(
    Math.round(
      (totalHours / 40) * 100
    ),
    100
  )

  const subjectMap = {}

  tasks.forEach((task) => {
    if (
      !subjectMap[task.category]
    ) {
      subjectMap[task.category] = {
        total: 0,
        completed: 0,
      }
    }

    subjectMap[
      task.category
    ].total += 1

    if (
      task.status ===
      "Completed"
    ) {
      subjectMap[
        task.category
      ].completed += 1
    }
  })

  const subjects = Object.keys(
    subjectMap
  ).map((subject) => ({
    name: subject,

    progress: Math.round(
      (subjectMap[subject]
        .completed /
        subjectMap[subject]
          .total) *
        100
    ),
  }))

  const mostActiveSubject =
    subjects.length > 0
      ? subjects.reduce(
          (
            prev,
            current
          ) =>
            prev.progress >
            current.progress
              ? prev
              : current
        ).name
      : "No subjects"

  const insights = [
    `You completed ${completed} tasks this week.`,
    `Most active subject: ${mostActiveSubject}.`,
    `Total study hours tracked: ${totalHours}h.`,
    productivity > 70
      ? "Excellent productivity this week."
      : "Try improving task consistency.",
  ]

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Monitor your academic
          performance and
          productivity.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Study Hours */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Study Hours
              </p>

              <h2 className="text-3xl font-bold dark:text-white mt-2">
                {totalHours}h
              </h2>
            </div>

            <div className="bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-2xl">
              <Clock3 className="text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Productivity */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Productivity
              </p>

              <h2 className="text-3xl font-bold dark:text-white mt-2">
                {productivity}%
              </h2>
            </div>

            <div className="bg-emerald-100 dark:bg-emerald-500/20 p-3 rounded-2xl">
              <TrendingUp className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Focus */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Focus Score
              </p>

              <h2 className="text-3xl font-bold dark:text-white mt-2">
                {focusScore}
              </h2>
            </div>

            <div className="bg-pink-100 dark:bg-pink-500/20 p-3 rounded-2xl">
              <Brain className="text-pink-500" />
            </div>
          </div>
        </div>

        {/* Goal */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Weekly Goal
              </p>

              <h2 className="text-3xl font-bold dark:text-white mt-2">
                {weeklyGoal}%
              </h2>
            </div>

            <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-2xl">
              <Target className="text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Radial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RadialCard
          title="Weekly Goal Progress"
          value={weeklyGoal}
          color="#6366f1"
          subtitle={`${totalHours}/40 Hours`}
        />

        <RadialCard
          title="Productivity Score"
          value={productivity}
          color="#10b981"
          subtitle="Task Completion"
        />
      </div>

      {/* Subject Performance */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/10">
        <h2 className="text-2xl font-bold dark:text-white mb-6">
          Subject Performance
        </h2>

        <div className="space-y-6">
          {subjects.map(
            (subject) => (
              <div
                key={
                  subject.name
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium dark:text-white">
                    {subject.name}
                  </h3>

                  <span className="text-indigo-600 font-semibold">
                    {
                      subject.progress
                    }
                    %
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${subject.progress}%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-5">
          Productivity Insights
        </h2>

        <div className="space-y-4">
          {insights.map(
            (
              insight,
              index
            ) => (
              <div
                key={index}
                className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl"
              >
                {insight}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics