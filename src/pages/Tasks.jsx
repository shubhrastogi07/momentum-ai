import { useTasks } from "../context/TaskContext";
import TaskItem from "../Components/dashboard/TaskItem";
import AddTaskForm from "../Components/dashboard/AddTaskForm";
import {useState} from "react";

function Tasks() {
  const {
    tasks,
    addTask,
    taskToggle,
    deleteTask,
  } = useTasks();

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }   
    if(filter === "pending") {
      return !task.completed;
    }
    return true;
  });    

  return (
    <div>
      {/* Page Header */}
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Tasks
        </h1>

        <p className="mt-1 text-slate-500">
          Manage everything you need to accomplish.
        </p>
      </div>

      {/* Add Task */}
      <div className="mt-6">
        <AddTaskForm onAddTask={addTask} />
      </div>

      {/* Tasks */}
      <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          All Tasks
        </h2>
        <div className="mt-6 flex gap-2">
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded-lg text-sm font-medium ${
      filter === "all"
        ? "bg-indigo-600 text-white"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("pending")}
    className={`px-4 py-2 rounded-lg text-sm font-medium ${
      filter === "pending"
        ? "bg-indigo-600 text-white"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`}
  >
    Pending
  </button>

  <button
    onClick={() => setFilter("completed")}
    className={`px-4 py-2 rounded-lg text-sm font-medium ${
      filter === "completed"
        ? "bg-indigo-600 text-white"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`}
  >
    Completed
  </button>
</div>
        <div className="mt-4 space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                completed={task.completed}
                dueDate={task.dueDate}
                priority={task.priority}
                estimatedMinutes={task.estimatedMinutes}
                onToggle={() => taskToggle(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-slate-500">
                No tasks yet.
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add your first task above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;