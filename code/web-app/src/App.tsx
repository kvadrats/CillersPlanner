import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import AuthCallback from "./components/AuthCallback";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import Hero from "./components/Hero";
import { useRef } from "react";
import MainView from "./components/MainView";

const isDev = process.env.NODE_ENV === "development";

const App: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null); // Define sidebarRef

  const handleButtonClick = () => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <Hero onClick={handleButtonClick} />
      <div ref={sidebarRef}>
        <MainView />
      </div>
    </Router>
  );
};

if (isDev) {
  loadDevMessages();
  loadErrorMessages();
}

export default App;
