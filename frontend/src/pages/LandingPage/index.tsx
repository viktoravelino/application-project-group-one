import { Link } from "react-router-dom";
export function LandingPage() {
  return (
    <div className="text-center bg-white pt-10 min-h-screen">
      <h1 className="text-xl font-bold">LandingPage</h1>
      <div>
        <Link to="/login">
          <button className="underline">Login Page</button>
        </Link>
      </div>
      <div>
        <Link to="/register">
          <button className="underline">Register Page</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard">
          <button className="underline">Dashboard</button>
        </Link>
      </div>
      <div>
        <Link to="/forgot-password">
          <button className="underline">Forgot Password</button>
        </Link>
      </div>
      <div>
        <Link to="/user-profile">
          <button className="underline">User Profile</button>
        </Link>
      </div>
    </div>
  );
}
