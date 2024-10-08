import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-big-calendar/lib/css/react-big-calendar.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/* Cannot use StrictMode because of oauthAgent timing issues when components are rerendered twice in dev mode.
 * Cookies and csrf tokens can become set in the wrong order.
 */
root.render(
  <>
    <App />
  </>
);

reportWebVitals();
