import { LuSearch } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
function Header(){
    return(
      <header className="flex items-center justify-between bg-white border-b border-slate-200 px-8 py-5">
  <div>
    <h1 className="text-2xl font-bold text-slate-900">
      Good Morning, Shubh 👋
    </h1>
    <p className="text-slate-500 mt-1">
      Let's make today productive.
    </p>
  </div>

  <div className="flex items-center gap-5">
    <LuSearch className="text-2xl text-slate-600 cursor-pointer" />
    <IoNotifications className="text-2xl text-slate-600 cursor-pointer" />

    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold cursor-pointer">
      S
    </div>
  </div>
</header>
    )
}
export default Header;