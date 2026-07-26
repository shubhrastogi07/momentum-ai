import {
  LuListTodo,
  LuCheckCheck,
  LuClock3,
  LuTarget,
} from "react-icons/lu";

import StatCard from "../components/dashboard/StatCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import TasksCard from "../Components/dashboard/TaskCard";
import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Go to Gym",
    completed: true,
  },
  {
    id: 3,
    title: "Build Momentum AI",
    completed:false,
  },
  {
    id: 4,
    title: "Read AI Notes",
    completed:false,
  },
];
function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  function taskToggle(id){
   setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
  }
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: LuListTodo,
    },    
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: LuCheckCheck,
    },
    {
      title: "Pending Tasks",
      value: totalTasks - completedTasks,
      icon: LuClock3,
    }

  ];
  
  return (
    <div>
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-500">
        Welcome back! Let's make today productive.
      </p>
      <div className="grid grid-cols-4 gap-6 mt-8">
  {stats.map((stat) => (
    <StatCard
      key={stat.title}
      icon={stat.icon}
      value={stat.value}
      title={stat.title}
    />
  ))}
</div>
<div className="mt-8">
  <ProgressCard
    title="Today's Progress"
    completed={completedTasks}
    total={totalTasks}
/>
</div>
<TasksCard tasks={tasks} onToggle={taskToggle} />

    </div>
  );
}

export default Dashboard;