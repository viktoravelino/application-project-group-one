import React from "react";
import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <>
      <h1>Register Page</h1>
      <div>
        <Link to="/">
          <button>Main Page</button>
        </Link>
      </div>
    </>
  );
}
