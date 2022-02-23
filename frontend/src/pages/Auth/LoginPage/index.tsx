import { useState } from "react";
import { AiOutlineUnlock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { AuthForm } from "../../../components/AuthFormComponents/AuthForm";
import { CenteredContainerAuthForm } from "../../../components/AuthFormComponents/CenteredContainerAuthForm";
import { Input } from "../../../components/AuthFormComponents/Input";
import GithubSvg from "../../../components/Icons/Github";
import GoogleSvg from "../../../components/Icons/Google";
import { useAuth } from "../../../context/AuthContext";

export const LoginPage = () => {
  const {
    signInUserWithGoogleProvider,
    signInUserWithGithubProvider,
    signInUserWithEmailAndPassword,
    isAuthLoading,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginWithEmailAndPassword: React.FormEventHandler<
    HTMLFormElement
  > = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    signInUserWithEmailAndPassword(email, password);
  };

  const handleLoginWithGoogleProvider: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    signInUserWithGoogleProvider();
  };

  const handleLoginWithGithubProvider: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    signInUserWithGithubProvider();
  };

  return (
    <CenteredContainerAuthForm>
      <AuthForm onSubmit={handleLoginWithEmailAndPassword}>
        <AuthForm.Header title="Login" />

        <AuthForm.Body
          showSpanLink
          spanLinkText="Forgot Password?"
          spanLinkPath="/forgot-password"
        >
          <Input
            Icon={BiUser}
            type="text"
            placeholder="email address"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <Input
            Icon={AiOutlineUnlock}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </AuthForm.Body>

        <AuthForm.Buttons>
          <button
            disabled={isAuthLoading}
            type="submit"
            className="px-5 py-3 text-sm font-medium text-white bg-primaryColor rounded-3xl w-5/6 disabled:opacity-75"
          >
            Sign In
          </button>
          <div className="w-full flex flex-col items-center">
            <span className="text-xs text-gray-400">Or continue with</span>
            <hr className="border-gray-400 mt-1 w-3/5" />
          </div>
          <div className="social-buttons flex flex-row gap-7 justify-center mt-2">
            <button
              disabled={isAuthLoading}
              onClick={handleLoginWithGoogleProvider}
              type="button"
            >
              <GoogleSvg width="30" height="30" />
            </button>
            <button
              disabled={isAuthLoading}
              onClick={handleLoginWithGithubProvider}
              type="button"
            >
              <GithubSvg width="30" height="30" />
            </button>
          </div>
        </AuthForm.Buttons>

        <AuthForm.Footer
          text="Don't have an account? "
          textLink="Register"
          to="/register"
        />
      </AuthForm>
    </CenteredContainerAuthForm>
  );
};
