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
    <div id="loginPage" className="bg-bgColor h-screen w-screen">
    

  <div id="formContainer" className="flex justify-center items-center h-screen">
  <form action="" className="max-w-xl mx-auto mb-0 space-y-4 bg-white p-20" >
  <div>
    <div className="flex justify-between">
      <label htmlFor="username" className="font-medium text-gray-600">Username</label>
    </div>

    <div className="relative mt-2">
      <input
        type="username"
        className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
        placeholder="Enter username"
      />

      <span className="absolute inset-y-0 inline-flex items-center right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
      </span>
    </div>
  </div>

  <div>
    <div className="flex justify-between">
      <label htmlFor="password" className="font-medium text-gray-600">Password</label>
    </div>

    <div className="relative mt-2">
      <input
        type="password"
        className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
        placeholder="Enter password"
      />
      <div className="flex justify-end">
      <a className="text-sm text-teal-500" href="">Forgotten password?</a>
      </div>
      <span className="absolute inset-y-0 inline-flex items-center right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </span>
    </div>
  </div>

  <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-green-500 rounded-lg">
    Sign in
  </button>
</form>


      </div>
            {/*link to main page*/}
              <Link to="/">
          <button className="text-black m-0 p-0">Main Page</button>
        </Link>
      </div>
      
  );
}
