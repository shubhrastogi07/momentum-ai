import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { useTasks } from "../context/TaskContext";
import { generateAIPlan } from "../services/gemini";

function AIPlanner() {
  const [availableTime, setAvailableTime] = useState(3);
  const [startTime, setStartTime] = useState("19:00");
  const { tasks, tasktoggle } = useTasks();
  const [plan, setPlan] = useState([]);
  const [unscheduledTasks, setUnscheduledTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handlePlanDay = async () => {
    try {
      setLoading(true);
      setError("");

      const availableMinutes = availableTime * 60;

      const pendingTasks = tasks.filter((task) => !task.completed);

      const result = await generateAIPlan(
        pendingTasks,
        availableMinutes,
        startTime
      );

      console.log("Gemini response:", result);

      // Remove markdown code fences if Gemini adds them
      const cleanedResult = result
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsedResult = JSON.parse(cleanedResult);

      setPlan(parsedResult.schedule || []);
      setUnscheduledTasks(parsedResult.unscheduledTasks || []);

    } catch (error) {
      console.error(error);
      setError("Something went wrong while generating your plan.");
    } finally {
      setLoading(false);
    }
  };

  // const generateMockPlan = () => {
  //   const availableMinutes = availableTime * 60;

  //   // Only consider incomplete tasks
  //   const pendingTasks = tasks.filter(
  //     (task) => !task.completed
  //   );

  //   // Priority order
  //   const priorityValue = {
  //     high: 1,
  //     medium: 2,
  //     low: 3,
  //   };

  //   // Sort tasks by priority
  //   const sortedTasks = [...pendingTasks].sort(
  //     (a, b) =>
  //       priorityValue[a.priority] -
  //       priorityValue[b.priority]
  //   );

  //   let remainingMinutes = availableMinutes;

  //   const plan = [];

  //   for (const task of sortedTasks) {
  //     if (task.estimatedMinutes <= remainingMinutes) {
  //       plan.push(task);

  //       remainingMinutes -= task.estimatedMinutes;
  //     }
  //   }

  //   return plan;
  // };

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
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LuSparkles size={18} />

            {loading ? "Planning..." : "Plan My Day"}
          </button>
          {error && (
            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
      {plan.length > 0 && (
        <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2">
            <LuSparkles className="text-indigo-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Your AI Plan
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            {plan.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.startTime} → {item.endTime}
                  </p>

                  {item.reason && (
                    <p className="mt-2 text-sm text-slate-400">
                      💡 {item.reason}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => tasktoggle(item.taskId)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
          {unscheduledTasks.length > 0 && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-lg font-semibold text-amber-900">
                Tasks Not Scheduled
              </h2>

              <p className="mt-1 text-sm text-amber-700">
                These tasks couldn't fit into your available time.
              </p>

              <div className="mt-4 space-y-3">
                {unscheduledTasks.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-amber-200 bg-white p-4"
                  >
                    <p className="font-medium text-slate-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIPlanner;