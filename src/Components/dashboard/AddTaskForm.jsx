import { useState } from "react";
import { LuPlus } from "react-icons/lu";

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    onAddTask(task,dueDate);

    setTask("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="What do you want to accomplish today?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 transition-colors"
      >
        <LuPlus />
        Add
      </button>
    </form>
  );
}

export default AddTaskForm;