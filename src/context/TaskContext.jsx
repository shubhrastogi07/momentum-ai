import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
    dueDate: "",
  },
  {
    id: 2,
    title: "Go to the gym",
    completed: true,
    dueDate: "",
  },
  {
    id: 3,
    title: "Build Momentum AI",
    completed: false,
    dueDate: "",
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, dueDate,priority, estimatedMinutes) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      dueDate,
      priority,
      estimatedMinutes
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const taskToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        taskToggle,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}