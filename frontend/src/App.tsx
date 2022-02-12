import "./App.css";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="app">
      <h1>Testing Routes 2</h1>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
