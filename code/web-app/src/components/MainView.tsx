import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Employees from "./Employees";
import Chat from "./Chat";
import Schedule from "./Schedule";

const MainView: React.FC = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="flex flex-1">
        <Sidebar />
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainView;
