import React from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <>
      <h1>Login Page</h1>
      <div>
        <Link to="/">
          <button>Main Page</button>
        </Link>
      </div>
    </>
  );
}
