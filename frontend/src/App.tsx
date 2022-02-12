import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";

// Main Application
import { MainLayoutContainer } from "./pages/MainLayoutContainer";

function App() {
  return (
    <div className="app">
      {/* <h1>Testing Routes</h1> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/testing" element={<MainLayoutContainer />} />
      </Routes>
    </div>
  );
}

export default App;
