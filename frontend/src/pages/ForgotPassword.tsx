import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "../components/AuthFormComponents/Button";
import { Input } from "../components/AuthFormComponents/Input";
import LogoSvg from "../components/Logo";

export const ForgotPassword = () => {
  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("reset");
  };

  return (
    <div id="loginPage" className="bg-bgColor ">
      <div
        id="formContainer"
        className="flex justify-center items-center h-5/6  w-screen"
      >
        <form
          onSubmit={(e) => handleResetPassword(e)}
          className="mx-auto mb-0 space-y-4 bg-white  rounded-form w-80 h-4/5"
        >
          <div className="flex justify-center p-5">
            <LogoSvg />
          </div>
          <div className="flex justify-center p-5">
            <label className="font-black font-title text-black-600 text-xl">
              Forgot Password
            </label>
          </div>

          <Input Icon={AiOutlineMail} placeholder="email address" />

          <div className="flex justify-center">
            <Button type="submit">Reset Password</Button>
          </div>

          <Link to="/login" className="text-sm underline text-link">
            Remember you password? Login
          </Link>
        </form>
      </div>
    </div>
  );
};
