import React, {useState} from "react";
import { Link } from "react-router-dom";
import './LoginPage.css';
//importing svg
import Logo from '../components/Logo';
import Google from '../components/Google';
import Twitter from '../components/Twitter';
import Facebook from '../components/Facebook';
//importing icons
import { BiUser } from 'react-icons/bi'
import {AiOutlineUnlock} from 'react-icons/ai';

export function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e : React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`Your account was created Username:  ${name} password: ${password}`);
}

  return (
    <div id="loginPage" className="bg-bgColor ">
    

  <div id="formContainer" className="flex justify-center items-center h-screen  w-screen">
  
  <form action="" className="mx-auto mb-0 space-y-4 bg-white  rounded-form w-80 h-4/5" >
    
    
    <div className="flex justify-center p-5">
    <Logo/>
    </div>
    <div className="flex justify-center p-5">
      <label className="font-black font-title text-black-600 text-xl">Login</label>
    </div>

    <div className="relative mt-2 p-3">
      
    <span className="absolute inset-y-0 inline-flex items-center left-12 bottom-0">
    <BiUser className="text-primaryColor "/>
    </span>

      <input
        className="w-4/5 p-0 pl-30 text-sm outline-0 border-b border-primaryColor text-center"
        placeholder="email address"
      />
    </div>
 

    {/* <div className="flex justify-between">
      <label htmlFor="password" className="font-medium text-gray-600">Password</label>
    </div> */}

    <div className="relative mt-2 p-3">

      <span className="absolute inset-y-0 inline-flex items-center left-12 bottom-0">
        <AiOutlineUnlock className="text-primaryColor "/>
      </span>

      <input
        className="w-4/5 p-0 pl-30 text-sm outline-0 border-b border-primaryColor text-center"
        placeholder="password"
      />
      {/* <div className="flex justify-end relative right-3">
      <a className="text-xs text-link underline" href="">Forgotten password?</a>
      </div> */}
    </div>

  <div className="flex justify-center">
  <button type="submit" className="block px-5 py-3 text-sm font-medium text-white bg-primaryColor rounded-btn w-5/6 ">
    Sign in
  </button>
  </div>

  <div className="grid justify-center p-10">
      <p className="w-f">Or continue</p>
      <hr className="border-primaryColor w-40  mx-auto p-20"/>
    <div> 
      <Google/>
      <Facebook/>
      <Twitter/>
    </div>
    <div>
        
        
    </div>
  </div>
</form>


      </div>
            {/*link to main page*/}
              <Link to="/">
         
        </Link>
      </div>
      
  );
}
