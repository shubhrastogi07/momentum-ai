import {
  LuLayoutDashboard,
  LuSquareCheckBig,
  LuCalendarDays,
  LuSparkles,
  LuSettings,
} from "react-icons/lu";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Tasks",
    icon: LuSquareCheckBig,
    path: "/tasks",
  },
  {
    title: "Calendar",
    icon: LuCalendarDays,
    path: "/calendar",
  },
  {
    title: "AI Planner",
    icon: LuSparkles,
    path: "/ai-planner",
  },
  {
    title: "Settings",
    icon: LuSettings,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <nav className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-indigo-600">
          Momentum AI
        </h1>
      </div>

      {/* Navigation */}
      <ul className="flex flex-col gap-4">
        {menuItems.map((menuItem) => (
          <li key={menuItem.title} className="mx-3 rounded-xl">
            
            <NavLink
              to={menuItem.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <menuItem.icon className="text-xl" />

              <span className="font-medium">
                {menuItem.title}
              </span>
            </NavLink>

          </li>
        ))}
      </ul>

      {/* User Profile */}
      <div className="mt-auto border-t border-slate-200 p-5">
        <div className="flex items-center gap-3">
          
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            S
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Shubh Rastogi
            </p>

            <p className="text-sm text-slate-500">
              Frontend Developer
            </p>
          </div>

        </div>
      </div>

    </nav>
  );
}

export default Sidebar;