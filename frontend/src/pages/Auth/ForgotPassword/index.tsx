import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/AuthFormComponents/Button";
import { Input } from "../../../components/AuthFormComponents/Input";
import LogoSvg from "../../../components/Icons/Logo";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";

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
          <Input
            Icon={AiOutlineMail}
            placeholder="email address"
            value={email}
            onChange={setEmail}
          />
          <div className="flex justify-center">
            <Button type="submit">Reset Password</Button>
          </div>
          <span className="text-sm ">
            Remember you password?{" "}
            <Link to="/login" className="underline text-link">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
