import { useState } from "react";
import { LuPlus } from "react-icons/lu";

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    onAddTask(task, dueDate, priority, estimatedMinutes);

    setTask("");
    setDueDate("");
    setPriority("medium");
    setEstimatedMinutes(30);
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
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <select
  value={estimatedMinutes}
  onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
>
  <option value={15}>15 minutes</option>
  <option value={30}>30 minutes</option>
  <option value={45}>45 minutes</option>
  <option value={60}>1 hour</option>
  <option value={90}>1.5 hours</option>
  <option value={120}>2 hours</option>
</select>

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