import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../LoginPage/styles.css";
//importing svg

//importing icons
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";
import { CenteredContainerAuthForm } from "../../../components/AuthFormComponents/CenteredContainerAuthForm";
import { AuthForm } from "../../../components/AuthFormComponents/AuthForm";
import { Input } from "../../../components/AuthFormComponents/Input";

export const RegisterPage: FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  const { currentUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   if (!email || !password || !name) {
  //     return;
  //   }
  //   registerUserWithEmailAndPassword(email, name, password);
  // };

  if (isAuthLoading) return <h1>Loading...</h1>;

  return (
    <CenteredContainerAuthForm>
      <AuthForm>
        <AuthForm.Header title="Register" />
        <AuthForm.Body>
          <Input Icon={BiUser} type="text" placeholder="Full name" />
          <Input Icon={BiUser} type="text" placeholder="email address" />
          <Input
            Icon={AiOutlineUnlock}
            type="password"
            placeholder="password"
          />
          <Input
            Icon={AiOutlineUnlock}
            type="password"
            placeholder="confirm password"
          />
        </AuthForm.Body>

        <AuthForm.Footer
          text="Already have an account? "
          textLink="Login"
          to="/login"
        />
      </AuthForm>
    </CenteredContainerAuthForm>
  );
};
