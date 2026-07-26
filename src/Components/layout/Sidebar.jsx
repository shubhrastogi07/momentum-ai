import {
  LuLayoutDashboard,
  LuSquareCheckBig,
  LuCalendarDays,
  LuSparkles,
  LuSettings,
} from "react-icons/lu";

const menuItems = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "Tasks",
    icon: LuSquareCheckBig,
  },
  {
    title: "Calendar",
    icon: LuCalendarDays,
  },
  {
    title: "AI Planner",
    icon: LuSparkles,
  },
  {
    title: "Settings",
    icon: LuSettings,
  },
];
function Sidebar() {
  return (
    <nav className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-indigo-600">Momentum AI</h1>
      </div>
      <ul className="flex flex-col gap-4">
        {menuItems.map((menuItem) => (
          <li key={menuItem.title} className="mx-3 rounded-xl">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all duration-200">
              <menuItem.icon className="text-xl text-slate-600"/>
              <span className="font-medium text-slate-700">{menuItem.title}</span>
            </div>
          </li>
        ))}
      </ul>
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
