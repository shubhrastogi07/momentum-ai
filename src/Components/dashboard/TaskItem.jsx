import { LuCheck } from "react-icons/lu";

function TaskItem({ title, completed, onToggle }) {
  return (
    <div
    onClick={onToggle}
     className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors cursor-pointer ">
      <div className="flex items-center gap-3">
        <div 
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            completed
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "border-slate-300"
          }`}
        >
          {completed && <LuCheck size={16} />}
        </div>

        <span
          className={`${
            completed
              ? "line-through text-slate-400"
              : "text-slate-800"
          }`}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;