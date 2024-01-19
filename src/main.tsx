import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoggedIn from "./LoggedIn.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/log" element={<LoggedIn />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
