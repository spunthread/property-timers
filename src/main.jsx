// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./style.css";

import App from "./App.jsx";
import { SaveProvider } from "./GameContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SaveProvider>
    <App />
  </SaveProvider>
  // </StrictMode>
);
