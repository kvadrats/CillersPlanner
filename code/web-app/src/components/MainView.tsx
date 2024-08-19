import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Employees from "./Employees";
import Chat from "./Chat";
import Schedule from "./Schedule";
import Main from "./Main";
import AuthCallback from "./AuthCallback";

const MainView: React.FC = () => {
  const location = useLocation();

  const isMainRoute = ["/employees", "/chat", "/schedule"].includes(
    location.pathname
  );

  return (
    <div className="relative h-screen w-full">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1">
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
        <div
          className={`flex flex-col justify-start items-end ${
            isMainRoute ? "w-48 p-4" : "w-full justify-center items-center"
          }`}
        >
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainView;
