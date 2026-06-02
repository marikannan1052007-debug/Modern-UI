import { useMemo, useState } from "react"

import {
  CheckCircle2,
  Clock3,
  BookOpen,
  Flame,
  
} from "lucide-react"

import { useStudent } from "../hooks/useStudent"

import StatsCard from "../components/cards/StatsCard"
import StudyChart from "../components/charts/RevenueChart"
import ProductivityPieChart from "../components/charts/ProductivityPieChart"
import UserTable from "../components/tables/UserTable"

function calculateStreak(tasks) {
  const completedDates = [
    ...new Set(
      tasks
        .filter(
          (task) =>
            task.status === "Completed" &&
            task.completedAt
        )
        .map((task) =>
          new Date(task.completedAt)
            .toISOString()
            .split("T")[0]
        )
    ),
  ]

  if (!completedDates.length)
    return 0

  completedDates.sort(
    (a, b) =>
      new Date(b) - new Date(a)
  )

  let streak = 0

  const current = new Date()

  while (true) {
    const currentDate =
      current
        .toISOString()
        .split("T")[0]

    if (
      completedDates.includes(
        currentDate
      )
    ) {
      streak++

      current.setDate(
        current.getDate() - 1
      )
    } else {
      break
    }
  }

  return streak
}

function Dashboard() {
  const [search, setSearch] =
    useState("")

  const {
    tasks,
    setTasks,
    settings,
  } = useStudent()

  const filteredTasks = tasks.filter(
    (task) =>
      task.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      task.subject
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      task.category
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  )

  const streak =
    calculateStreak(tasks)

  const stats = useMemo(() => {
    const completed = tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length

    const pending = tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length

    const totalHours =
      tasks.reduce(
        (acc, task) =>
          acc +
          Number(
            task.hours || 0
          ),
        0
      )

    return {
      completed,
      pending,
      totalHours,
    }
  }, [tasks])


  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1
          className="
          text-3xl
          font-bold
          tracking-tight
          dark:text-white
        "
        >
          Welcome back,{" "}
          {settings?.name ||
            "Student"}{" "}
          👋
        </h1>

        <p
          className="
          mt-2
          text-gray-500
          dark:text-gray-400
        "
        >
          {settings?.course ||
            "Course"}{" "}
          • Semester{" "}
          {settings?.semester ||
            "-"}
        </p>
      </div>

      {/* Stats */}
      <div
        className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
      >
        <StatsCard
          title="Tasks Completed"
          value={stats.completed}
          growth="+12%"
          icon={CheckCircle2}
          color="bg-emerald-500"
        />

        <StatsCard
          title="Pending Tasks"
          value={stats.pending}
          growth="+4%"
          icon={Clock3}
          color="bg-amber-500"
        />

        <StatsCard
          title="Study Hours"
          value={`${stats.totalHours}h`}
          growth="+18%"
          icon={BookOpen}
          color="bg-indigo-500"
        />

        <StatsCard
          title="Study Streak"
          value={`${streak} Days`}
          growth={
            streak > 0
              ? `${streak} Day${
                  streak > 1
                    ? "s"
                    : ""
                }`
              : "Start Today"
          }
          icon={Flame}
          color="bg-orange-500"
        />

       
      </div>

      {/* Summary */}
      <div
        className="
        bg-gradient-to-r
        from-indigo-500
        to-cyan-500
        rounded-3xl
        p-6
        text-white
      "
      >
        <h2 className="text-2xl font-bold">
          Weekly Summary
        </h2>

        <p className="mt-2">
          {settings?.name ||
            "Student"}
          , you've completed{" "}
          {stats.completed} task
          {stats.completed !== 1
            ? "s"
            : ""}
          , studied for{" "}
          {stats.totalHours}
          hours, and currently
          have a {streak}-day
          streak.
        </p>
      </div>

      {/* Charts */}
      <div
        className="
        grid
        grid-cols-1
        gap-6
        2xl:grid-cols-3
      "
      >
        <div className="2xl:col-span-2 min-w-0">
          <StudyChart
            tasks={
              filteredTasks
            }
          />
        </div>

        <div className="min-w-0">
          <ProductivityPieChart
            tasks={
              filteredTasks
            }
          />
        </div>
      </div>

      {/* Table */}
      <UserTable
        tasks={filteredTasks}
        setTasks={setTasks}
        search={search}
        setSearch={setSearch}
      />
    </div>
  )
}

export default Dashboard