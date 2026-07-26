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

function TasksCard({ tasks , onToggle }) {
  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Today's Tasks
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            completed={task.completed}
            onToggle = {()=>{
                onToggle(task.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TasksCard;