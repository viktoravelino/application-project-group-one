import React from "react";
import ReactDOM from "react-dom";
//import { MdDarkMode } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
      <body className="bg-white dark:bg-black.transition-all">
    <BrowserRouter>
      <AuthContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    </body>
  </React.StrictMode>,
  document.getElementById("root")
);
