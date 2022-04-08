//@ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import { MdDarkMode } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    
    <ThemeProvider>
      <body className="bg-white dark:bg-black.transition-all">
    <BrowserRouter>
      <AuthContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    </body>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
