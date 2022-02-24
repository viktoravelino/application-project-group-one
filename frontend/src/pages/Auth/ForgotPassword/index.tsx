import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Button } from "../../../components/AuthFormComponents/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { CenteredContainerAuthForm } from "../../../components/AuthFormComponents/CenteredContainerAuthForm";
import { Input } from "../../../components/AuthFormComponents/Input";

import { BiUser } from "react-icons/bi";
import { AuthForm } from "../../../components/AuthFormComponents/AuthForm";


export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset email sent");
      navigate("/login");
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <CenteredContainerAuthForm>
    <AuthForm onSubmit={(e) => handleResetPassword(e)}>

        <AuthForm.Header title="Forgot Password" />

        <AuthForm.Body >

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
            className="px-5 py-3 text-sm font-medium text-white bg-primaryColor rounded-3xl w-5/6 disabled:opacity-75"
          >
            Reset Password
          </button>

          <span className="text-sm ">
            Remember you password?{" "}
            <Link to="/login" className="underline text-link">
              Login
            </Link>
          </span>
          </AuthForm.Buttons>

    </AuthForm>
    </CenteredContainerAuthForm>
  );
};
