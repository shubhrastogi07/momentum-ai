import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { useTasks } from "../context/TaskContext";

function AIPlanner() {
  const [availableTime, setAvailableTime] = useState(3);
  const [startTime, setStartTime] = useState("19:00");
  const { tasks } = useTasks();
  const [plan, setPlan] = useState([]);
  const handlePlanDay = () => {
//   console.log("Available Time:", availableTime);
//   console.log("Start Time:", startTime);
//   console.log("Tasks:", tasks);
 const plan = generateMockPlan();

  console.log("Generated Plan:", plan);
  setPlan(plan);
};
 

const generateMockPlan = () => {
  const availableMinutes = availableTime * 60;

  // Only consider incomplete tasks
  const pendingTasks = tasks.filter(
    (task) => !task.completed
  );

  // Priority order
  const priorityValue = {
    high: 1,
    medium: 2,
    low: 3,
  };

  // Sort tasks by priority
  const sortedTasks = [...pendingTasks].sort(
    (a, b) =>
      priorityValue[a.priority] -
      priorityValue[b.priority]
  );

  let remainingMinutes = availableMinutes;

  const plan = [];

  for (const task of sortedTasks) {
    if (task.estimatedMinutes <= remainingMinutes) {
      plan.push(task);

      remainingMinutes -= task.estimatedMinutes;
    }
  }

  return plan;
};

  return (
    <div>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <LuSparkles className="text-indigo-600" size={24} />

          <h1 className="text-2xl font-bold text-slate-900">
            AI Planner
          </h1>
        </div>

        <p className="mt-1 text-slate-500">
          Let AI organize your day based on your priorities.
        </p>
      </div>

      {/* Planner Form */}
      <div className="mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Plan your day
        </h2>

        <div className="mt-6 space-y-5">
          {/* Available Time */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              How much time do you have today?
            </label>

            <select
              value={availableTime}
              onChange={(e) =>
                setAvailableTime(Number(e.target.value))
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              <option value={4}>4 hours</option>
              <option value={5}>5 hours</option>
              <option value={6}>6 hours</option>
              <option value={8}>8 hours</option>
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              When can you start?
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={handlePlanDay}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            <LuSparkles size={18} />

            Plan My Day
          </button>
        </div>
      </div>
      {plan.length > 0 && (
  <div className="mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6">
    <h2 className="text-lg font-semibold text-slate-900">
      Your Plan
    </h2>

    <div className="mt-4 space-y-3">
      {plan.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
        >
          <div>
            <p className="font-medium text-slate-800">
              {task.title}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {task.estimatedMinutes} minutes
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              task.priority === "high"
                ? "bg-red-100 text-red-600"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
}

export default AIPlanner;