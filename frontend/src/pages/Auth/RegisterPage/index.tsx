import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginPage/styles.css";
//importing svg
import Logo from "../../../components/Icons/Logo";
import Google from "../../../components/Icons/Google";
import Github from "../../../components/Icons/Github";

//importing icons
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";

export const RegisterPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registerUserWithEmailAndPassword, currentUser, isAuthLoading } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password || !name) {
      return;
    }
    registerUserWithEmailAndPassword(email, name, password);
  };

  if (isAuthLoading) return <h1>Loading...</h1>;

  return (
    <div id="loginPage" className="bg-bgColor text-center">
      <button onClick={() => console.log(currentUser)}>test</button>
      <div
        id="formContainer"
        className="flex justify-center items-center h-5/6  w-screen"
      >
        <form className="mx-auto mb-0 space-y-4 bg-white  rounded-form w-80 h-4/5 rounded-2xl">
          <div className="flex justify-center p-5">
            <Logo />
          </div>
          <div className="flex justify-center p-5">
            <label className="font-black font-title text-black-600 text-2xl">
              Sign Up
            </label>
          </div>

          <div className="relative mt-2 p-3">
            <span className="absolute inset-y-0 inline-flex items-center left-12 bottom-0">
              <BiUser className="text-primaryColor " />
            </span>

            <input
              className="w-4/5 p-0 pl-30 text-sm outline-0 border-b border-primaryColor text-center"
              placeholder="Name"
              onChange={(e) => setName(e.currentTarget.value)}
              value={email}
            />
          </div>

          <div className="relative mt-2 p-3">
            <span className="absolute inset-y-0 inline-flex items-center left-12 bottom-0">
              <BiUser className="text-primaryColor " />
            </span>

            <input
              className="w-4/5 p-0 pl-30 text-sm outline-0 border-b border-primaryColor text-center"
              placeholder="email address"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
          </div>

          {/* <div className="flex justify-between">
      <label htmlFor="password" className="font-medium text-gray-600">Password</label>
    </div> */}

          <div className="relative mt-2 p-3">
            <span className="absolute inset-y-0 inline-flex items-center left-12 bottom-3">
              <AiOutlineUnlock className="text-primaryColor " />
            </span>

            <input
              className="w-4/5 p-0 pl-30 text-sm outline-0 border-b border-primaryColor text-center"
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="block px-5 py-3 text-sm font-medium text-white bg-primaryColor rounded-3xl w-5/6 "
            >
              Sign Up
            </button>
          </div>

          <div className="flex flex-col  p-10 mx-auto my-auto">
            <p className="w-f font- text-[10px] text-stone-400">
              Or continue with
            </p>
            <hr className="border-primaryColor w-40 mx-auto p-20 my-auto" />
            <div className="flex mx-auto relative bottom-36">
              <div className="p-2">
                <Google />
              </div>
              <div className="p-2">
                <Github />
              </div>
            </div>
            <div></div>
          </div>
        </form>
      </div>
      {/*link to main page*/}
      <Link to="/"></Link>
    </div>
  );
};