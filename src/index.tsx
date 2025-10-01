import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";

import App from "./App/App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);