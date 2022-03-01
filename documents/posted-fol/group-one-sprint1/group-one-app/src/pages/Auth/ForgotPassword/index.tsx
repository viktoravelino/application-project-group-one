import React, { useState } from "react";
import { CenteredContainerAuthForm } from "../../../components/AuthFormComponents/CenteredContainerAuthForm";
import { Input } from "../../../components/AuthFormComponents/Input";

import { BiUser } from "react-icons/bi";
import { AuthForm } from "../../../components/AuthFormComponents/AuthForm";
import { useAuth } from "../../../context/AuthContext";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isAuthLoading } = useAuth();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      alert("Provide your email!");
      return;
    }
    forgotPassword(email);
  };

  return (
    <CenteredContainerAuthForm>
      <AuthForm onSubmit={(e) => handleResetPassword(e)}>
        <AuthForm.Header title="Forgot Password" />

        <AuthForm.Body>
          <Input
            Icon={BiUser}
            type="text"
            placeholder="email address"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </AuthForm.Body>

        <AuthForm.Buttons>
          <button
            type="submit"
            disabled={isAuthLoading}
            className="px-5 py-3 text-sm font-medium text-white bg-primaryColor rounded-3xl w-5/6 disabled:opacity-75"
          >
            Reset Password
          </button>
        </AuthForm.Buttons>
        <AuthForm.Footer
          text="Remember you password? "
          textLink="Login"
          to="/login"
        />
      </AuthForm>
    </CenteredContainerAuthForm>
  );
};
