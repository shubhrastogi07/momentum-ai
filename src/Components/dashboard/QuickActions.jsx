import {
  LuPlus,
  LuSparkles,
  LuCalendarDays,
} from "react-icons/lu";

function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-5">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-3">

        <button className="flex items-center gap-3 rounded-xl bg-indigo-600 text-white px-4 py-3 hover:bg-indigo-700 transition-colors">
          <LuPlus />
          Add Task
        </button>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50 transition-colors">
          <LuSparkles />
          AI Plan My Day
        </button>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50 transition-colors">
          <LuCalendarDays />
          Open Calendar
        </button>

      </div>
    </div>
  );
}

export default QuickActions;