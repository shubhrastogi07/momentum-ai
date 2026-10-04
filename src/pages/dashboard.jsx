import {
  LuListTodo,
  LuCheckCheck,
  LuClock3,
} from "react-icons/lu";

import StatCard from "../Components/dashboard/StatCard";
import ProgressCard from "../Components/dashboard/ProgressCard";
import TasksCard from "../Components/dashboard/TaskCard";
import QuickActions from "../Components/dashboard/QuickActions";
import AddTaskForm from "../Components/dashboard/AddTaskForm";
import { useTasks } from "../context/TaskContext";
import { getLocalDateString } from "../utils/date";

function Dashboard() {
  const {
    tasks,
    addTask,
    taskToggle,
    deleteTask,
  } = useTasks();

  // -----------------------------
  // Overall task statistics
  // -----------------------------

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  // -----------------------------
  // Today's tasks
  // -----------------------------

  const today =  getLocalDateString();

  const todayTasks = tasks.filter(
    (task) => task.dueDate === today
  );

  const todayCompletedTasks = todayTasks.filter(
    (task) => task.completed
  ).length;

  // -----------------------------
  // Upcoming deadlines
  // -----------------------------

  const upcomingTasks = tasks
    .filter(
      (task) =>
        !task.completed &&
        task.dueDate &&
        task.dueDate >= today
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate)
    )
    .slice(0, 5);

  // -----------------------------
  // High priority tasks
  // -----------------------------

  const highPriorityTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.priority === "high"
  );

  const highPriorityCount = highPriorityTasks.length;

  // -----------------------------
  // Dashboard statistics
  // -----------------------------

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: LuListTodo,
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: LuCheckCheck,
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: LuClock3,
    },
    {
      title: "Today's Tasks",
      value: todayTasks.length,
      icon: LuListTodo,
    },
  ];

  return (
    <div>
      {/* Header */}
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-500">
        Welcome back! Let's make today productive.
      </p>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            value={stat.value}
            title={stat.title}
          />
        ))}
      </div>

      {/* Progress + Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProgressCard
          title="Today's Progress"
          completed={todayCompletedTasks}
          total={todayTasks.length}
        />

        <QuickActions />
      </div>

      {/* Today's Tasks */}
      <div className="mt-6">
        <AddTaskForm onAddTask={addTask} />

        <div className="mt-6">
          <TasksCard
            tasks={todayTasks}
            onToggle={taskToggle}
            onDelete={deleteTask}
          />
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Upcoming Deadlines
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your next pending tasks.
        </p>

        <div className="mt-4 space-y-3">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {task.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Due: {task.dueDate}
                  </p>
                </div>

                <span
                  className={`rounded-lg px-3 py-1 text-xs font-medium ${
                    task.priority === "high"
                      ? "bg-red-50 text-red-600"
                      : task.priority === "medium"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {task.priority || "medium"}
                </span>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              No upcoming deadlines 🎉
            </p>
          )}
        </div>
      </div>

      {/* High Priority Insight */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-50 p-3">
            <LuClock3 className="text-xl text-red-600" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              High Priority Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {highPriorityCount === 0
                ? "You have no pending high-priority tasks."
                : `You have ${highPriorityCount} pending high-priority ${
                    highPriorityCount === 1
                      ? "task"
                      : "tasks"
                  }.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;