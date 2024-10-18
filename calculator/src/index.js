import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { APPContext } from "./components/Context"; // Use uppercase C here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <APPContext> 
    <App />
  </APPContext>
);
