import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

// Main Application
import { MainLayoutContainer } from "./pages/MainLayoutContainer";
import MainPage from "./pages/MainPage";
import { ForgotPassword } from "./pages/ForgotPassword";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<MainLayoutContainer />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
