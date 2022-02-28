import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RegisterPage } from "./pages/Auth/RegisterPage";

// Main Application
import { MainLayoutContainer } from "./pages/MainLayoutContainer";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { UserProfilePage } from "./pages/UserProfilePage";
import { LandingPage } from "./pages/LandingPage";
import { useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/Auth/LoginPage";

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
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <MainLayoutContainer />
            </RequireAuth>
          }
        />

        {/* Restricted Access */}
        <Route
          path="/user-profile"
          element={
            <RequireAuth>
              <UserProfilePage />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

function RequireAuth({ children }: { children: JSX.Element }) {
  let { currentUser, isAuthLoading } = useAuth();
  let location = useLocation();

  if (isAuthLoading) return <h1>Loading...</h1>;

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
