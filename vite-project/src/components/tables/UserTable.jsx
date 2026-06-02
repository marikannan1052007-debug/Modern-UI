import { useState } from "react"

import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function UserTable({
  tasks,
  setTasks,
  search,
  setSearch,
}) {
  // Form State
  const [taskName, setTaskName] =
    useState("")

  const [subject, setSubject] =
    useState("")

  const [deadline, setDeadline] =
    useState("")

  const [hours, setHours] =
    useState("")

  // Pagination
  const [currentPage, setCurrentPage] =
    useState(1)

  const tasksPerPage = 5

  const indexOfLastTask =
    currentPage * tasksPerPage

  const indexOfFirstTask =
    indexOfLastTask - tasksPerPage

  const currentTasks = tasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  )

  const totalPages = Math.ceil(
    tasks.length / tasksPerPage
  )

  // Add Task
  const addTask = () => {
    if (
      !taskName ||
      !subject ||
      !deadline ||
      !hours
    )
      return

    const newTask = {
      id: Date.now(),

      name: taskName,

      subject,

      category: subject,

      status: "In Progress",

      deadline,

      hours: Number(hours),

      createdAt: "Just now",
    }

    setTasks([newTask, ...tasks])

    // Reset Form
    setTaskName("")
    setSubject("")
    setDeadline("")
    setHours("")
  }

  // Update Status
 const updateTaskStatus = (
  id,
  status
) => {
  const updatedTasks = tasks.map(
    (task) =>
      task.id === id
        ? {
            ...task,
            status,

            completedAt:
              status === "Completed"
                ? new Date().toISOString()
                : null,
          }
        : task
  )

  setTasks(updatedTasks)
}

  // Delete Task
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(
      (task) => task.id !== id
    )

    setTasks(filteredTasks)
  }

  return (
    <div
      className="
      bg-white/80
      dark:bg-white/5
      backdrop-blur-xl
      rounded-3xl
      border
      border-white/20
      dark:border-white/10
      shadow-sm
      overflow-hidden
    "
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold dark:text-white">
              Assignments Tracker
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Track assignment submissions and deadlines
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search assignments..."
                className="
                pl-10
                pr-4
                py-2.5
                border
                border-slate-200
                dark:border-white/10
                bg-white/80
                dark:bg-white/5
                rounded-xl
                outline-none
                dark:text-white
                focus:ring-2
                focus:ring-indigo-500
                transition-all
              "
              />
            </div>

            {/* Add Task Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="
                  flex
                  items-center
                  gap-2
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  transition-all
                "
                >
                  <Plus size={18} />
                  Add Task
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[450px] dark:bg-[#111827] dark:border-white/10">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">
                    Create New Task
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  {/* Task Name */}
                  <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) =>
                      setTaskName(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    outline-none
                    dark:bg-[#0f172a]
                    dark:border-white/10
                    dark:text-white
                  "
                  />

                  {/* Subject */}
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) =>
                      setSubject(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    outline-none
                    dark:bg-[#0f172a]
                    dark:border-white/10
                    dark:text-white
                  "
                  />

                  {/* Deadline */}
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) =>
                      setDeadline(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    outline-none
                    dark:bg-[#0f172a]
                    dark:border-white/10
                    dark:text-white
                  "
                  />

                  {/* Hours */}
                  <input
                    type="number"
                    placeholder="Study Hours"
                    value={hours}
                    onChange={(e) =>
                      setHours(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    outline-none
                    dark:bg-[#0f172a]
                    dark:border-white/10
                    dark:text-white
                  "
                  />

                  {/* Add Button */}
                  <button
                    onClick={addTask}
                    className="
                    w-full
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    py-3
                    rounded-xl
                    transition-all
                  "
                  >
                    Add Task
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead
            className="
            bg-slate-50/80
            dark:bg-white/5
            text-gray-500
            dark:text-gray-400
            text-sm
          "
          >
            <tr>
              <th className="text-left px-6 py-4">
                Task
              </th>

              <th className="text-left px-6 py-4">
                Subject
              </th>

              <th className="text-left px-6 py-4">
                Category
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Deadline
              </th>

              <th className="text-left px-6 py-4">
                Hours
              </th>

              <th className="text-right px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {currentTasks.map((task) => (
              <tr
                key={task.id}
                className="
                border-t
                hover:bg-slate-50
                dark:hover:bg-white/5
                transition-all
              "
              >
                {/* Task */}
                <td className="px-6 py-4 font-medium dark:text-white">
                  {task.name}
                </td>

                {/* Subject */}
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {task.subject}
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span
                    className="
                    px-3
                    py-1
                    rounded-full
                    bg-indigo-50
                    dark:bg-indigo-500/20
                    text-indigo-600
                    text-sm
                  "
                  >
                    {task.category}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        task.id,
                        e.target.value
                      )
                    }
                    className="
                    px-3
                    py-2
                    rounded-xl
                    border
                    bg-white
                    dark:bg-[#111827]
                    dark:border-white/10
                    dark:text-white
                  "
                  >
                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>
                  </select>
                </td>

                {/* Deadline */}
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {task.deadline}
                </td>

                {/* Hours */}
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {task.hours}h
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    {/* Complete */}
                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task.id,
                          "Completed"
                        )
                      }
                      className="
                      px-3
                      py-2
                      rounded-xl
                      bg-emerald-500
                      hover:bg-emerald-600
                      text-white
                      text-sm
                    "
                    >
                      Done
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        deleteTask(
                          task.id
                        )
                      }
                      className="
                      px-3
                      py-2
                      rounded-xl
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      text-sm
                    "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="
        flex
        items-center
        justify-between
        px-6
        py-4
        border-t
        border-white/10
      "
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of{" "}
          {totalPages || 1}
        </p>

        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            dark:border-white/10
            flex
            items-center
            justify-center
            disabled:opacity-50
            hover:bg-slate-100
            dark:hover:bg-white/10
            transition-all
          "
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next */}
          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            dark:border-white/10
            flex
            items-center
            justify-center
            disabled:opacity-50
            hover:bg-slate-100
            dark:hover:bg-white/10
            transition-all
          "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable