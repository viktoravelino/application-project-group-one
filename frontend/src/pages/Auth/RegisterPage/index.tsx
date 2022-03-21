import { FC, useState } from "react";

//importing icons
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai"
import { useAuth } from "../../../context/AuthContext";
import { CenteredContainerAuthForm } from "../../../components/AuthFormComponents/CenteredContainerAuthForm";
import { AuthForm } from "../../../components/AuthFormComponents/AuthForm";
import { Input } from "../../../components/AuthFormComponents/Input";
import GithubSvg from "../../../components/Icons/Github";
import GoogleSvg from "../../../components/Icons/Google";

export const RegisterPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    isAuthLoading, registerUserWithEmailAndPassword,
    signInUserWithGoogleProvider,
    signInUserWithGithubProvider,
  } = useAuth();

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

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      alert("Some fields are empty")
      return;
    }
    if( password !== confirmPassword ) {
      alert("password don't match");
      return; 
    }
    else{
      registerUserWithEmailAndPassword(email, name, password);
    }
  };

  if (isAuthLoading) return <h1>Loading...</h1>;

  return (
    <CenteredContainerAuthForm>
      <AuthForm onSubmit={handleSubmit}>
        <AuthForm.Header title="Register" />
        <AuthForm.Body>
          <Input Icon={BiUser} type="text" placeholder="Full name" onChange={e => {
            setName(e.currentTarget.value);
          }}/>

          <Input Icon={AiOutlineMail} type="text" placeholder="email address" onChange={e => {
            setEmail(e.currentTarget.value);
          }} />
          <Input
            Icon={AiOutlineUnlock}
            type="password"
            placeholder="password"
            onChange={e => {
              setPassword(e.currentTarget.value);
            }}
          />
          <Input
            Icon={AiOutlineUnlock}
            type="password"
            placeholder="confirm password"
            onChange={e => {
              setConfirmPassword(e.currentTarget.value);
            }}
          />
        </AuthForm.Body>

        <AuthForm.Buttons>
          <button
          type="submit"
          className="px-5 py-3 text-sm font-medium text-white bg-primaryColor rounded-3xl w-5/6 disabled:opacity-75"
          disabled={isAuthLoading}
          >
            Create Account
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
          text="Already have an account? "
          textLink="Login"
          to="/login"
        />
      </AuthForm>
    </CenteredContainerAuthForm>
  );
};
