// /*
//  * LC Pilot — main.jsx
//  * React entry point. Mounts into the #root div inside the sidebar iframe.
//  */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
