import React from "react";
import { Link } from "react-router-dom";
import "./../App.css";
export default function MainPage() {
  return (
    <>
      <h1>Main Page</h1>
      <div>
        <Link to="/login">
          <button>Login Page</button>
        </Link>
      </div>
      <div>
        <Link to="/register">
          <button>Register Page</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
      <div>
        <Link to="/forgot-password">
          <button>Forgot Password</button>
        </Link>
      </div>
    </>
  );
}
