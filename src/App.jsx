// import Sidebar from "./Components/layout/Sidebar";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import AIPlanner from "./pages/AIPlanner";
import Settings from "./pages/Settings";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
      <Route index element = {<Navigate to="/dashboard" replace/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="tasks" element={<Tasks/>}/>
      <Route path="calendar" element={<Calendar/>}/>
      <Route path="ai-planner" element={<AIPlanner/>}/>
      <Route path="settings" element={<Settings/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
