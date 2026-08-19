import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useTasks } from "../context/TaskContext";

function Calendar() {
  const { tasks } = useTasks();

  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const getDateString = (day) => {
    const date = new Date(year, month, day);

    return date.toISOString().split("T")[0];
  };

  const getTasksForDate = (day) => {
    if (!day) return [];

    const dateString = getDateString(day);

    return tasks.filter(
      (task) => task.dueDate === dateString
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Calendar
          </h1>

          <p className="mt-1 text-slate-500">
            View and manage your tasks by date.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            <LuChevronLeft />
          </button>

          <h2 className="min-w-40 text-center text-lg font-semibold text-slate-800">
            {monthName} {year}
          </h2>

          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            <LuChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 rounded-2xl bg-white border border-slate-200 overflow-hidden">

        {/* Week Days */}
        <div className="grid grid-cols-7 border-b border-slate-200">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm font-semibold text-slate-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateString = day
              ? getDateString(day)
              : null;

            const dayTasks = getTasksForDate(day);

            const isSelected =
              dateString === selectedDate;

            return (
              <div
                key={index}
                onClick={() => {
                  if (day) {
                    setSelectedDate(dateString);
                  }
                }}
                className={`min-h-32 border-r border-b border-slate-200 p-3 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-indigo-50"
                    : "hover:bg-slate-50"
                }`}
              >
                {day && (
                  <>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "text-slate-700"
                      }`}
                    >
                      {day}
                    </div>

                    {/* Tasks */}
                    <div className="mt-2 space-y-1">
                      {dayTasks.map((task) => (
                        <div
                          key={task.id}
                          className="truncate rounded-md bg-indigo-100 px-2 py-1 text-xs text-indigo-700"
                        >
                          {task.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;