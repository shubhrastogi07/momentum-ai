import TaskItem from "./TaskItem";

// const tasks = [
//   {
//     id: 1,
//     title: "Learn React",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Go to Gym",
//     completed: true,
//   },
//   {
//     id: 3,
//     title: "Build Momentum AI",
//     completed: false,
//   },
//   {
//     id: 4,
//     title: "Read AI Notes",
//     completed: false,
//   },
// ];

function TasksCard({ tasks , onToggle, onDelete }) {
  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Today's Tasks
      </h2>

     <div className="space-y-3">
  {tasks.length > 0 ? (
    tasks.map((task) => (
      <TaskItem
        key={task.id}
        title={task.title}
        dueDate = {task.dueDate}
        completed={task.completed}
        onToggle={() => onToggle(task.id)}
        onDelete={() => onDelete(task.id)}
      />
    ))
  ) : (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-4 text-4xl">
        🎯
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        No tasks for today
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Add your first task and start building momentum.
      </p>
    </div>
  )}
</div>
    </div>
  );
}

export default TasksCard;