import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

// Main Application
import { MainLayoutContainer } from "./pages/MainLayoutContainer";
import { ForgotPassword } from "./pages/ForgotPassword";
import { UserProfilePage } from "./pages/UserProfilePage";
import { LandingPage } from "./pages/LandingPage";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Restricted Access */}
        <Route path="/dashboard" element={<MainLayoutContainer />} />

        <Route path="/user-profile" element={<UserProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
