import { LuCheck, LuTrash2 } from "react-icons/lu";


function TaskItem({ title, completed, dueDate, priority, estimatedMinutes, onToggle, onDelete }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-all">

            <div
                onClick={onToggle}
                className="flex items-center gap-3 cursor-pointer flex-1"
            >
                <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${completed
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-slate-300"
                        }`}
                >
                    {completed && <LuCheck size={16} />}
                </div>

                <span
                    className={`${completed
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                        }`}
                >
                    {title}
                    {priority && (
                        <span
                            className={`text-xs font-medium ${priority === "high"
                                ? "text-red-500"
                                : priority === "medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }`}
                        >
                            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                        </span>
                    )}
                    {estimatedMinutes && (
                        <span className="text-xs text-slate-400">
                            • {estimatedMinutes >= 60
                                ? `${estimatedMinutes / 60} hour${estimatedMinutes >= 120 ? "s" : ""
                                }`
                                : `${estimatedMinutes} min`}
                        </span>
                    )}
                    {dueDate && (
                        <p className="text-xs text-slate-400 mt-1">
                            Due: {dueDate}
                        </p>
                    )}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete()
                }}
                title="Delete task"
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
                <LuTrash2 size={18} />
            </button>

        </div>
    );
}

export default TaskItem;