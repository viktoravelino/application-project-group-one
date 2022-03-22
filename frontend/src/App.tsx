import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MainLayoutContainer } from "./components/MainLayoutContainer";
import { useAuth } from "./context/AuthContext";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { BudgetPage } from "./pages/BudgetPage";
import { BudgetsPage } from "./pages/BudgetsPage";
import { ExpensesPage } from "./pages/ExpensesPage";
import { LandingPage } from "./pages/LandingPage";
import { UserProfilePage } from "./pages/UserProfilePage";

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

        {/* Authenticated Routes With Header and navigation */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayoutContainer />
            </RequireAuth>
          }
        >
          {/* Routes go here */}

          <Route path="/dashboard" element={<h1>Dash</h1>} />


          {/* /budgets */}
          <Route path="/budgets">
            <Route index element={<BudgetsPage />} />


            {/* /budgets/123 */}
            <Route path=":budgetId">
              <Route index element={<BudgetPage />} />

            {/* /budgets/123/expenses */}
              <Route path="expenses">
                <Route index element={<ExpensesPage/>} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Authenticated Routes With only the header */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          {/* Routes go here */}
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
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
