import Sidebar from "../Components/layout/Sidebar";
import Header from "../Components/layout/Header";
import { Outlet } from "react-router-dom";


function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
  <Sidebar />

  <div className="flex-1 flex flex-col">
    <Header />

    <main className="flex-1 p-8">
      <Outlet/>
    </main>
  </div>
</div>
  );
}

export default MainLayout;