import { BrowserRouter as Router } from "react-router-dom";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import Hero from "./components/Hero";
import { useRef } from "react";
import MainView from "./components/MainView";
import { AuthProvider } from "./utils/authContext";

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
      <Hero onClick={handleButtonClick} />
      <div ref={sidebarRef}>
        <AuthProvider>
          <MainView />
        </AuthProvider>
      </div>
    </Router>
  );
};

if (isDev) {
  loadDevMessages();
  loadErrorMessages();
}

export default App;
