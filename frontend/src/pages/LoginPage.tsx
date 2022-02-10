import React, {useState} from "react";
import { Link } from "react-router-dom";
import './LoginPage.css';
//importing logo
import Logo from '../components/Logo';
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
    <>
      <div id="loginPage">

      <div id="login-container">
       
      <form id="form" onSubmit={handleSubmit}>

      {/* top level container */}
      <div id="top-form-container">

        <div className="top-block">

          <div id="logo">
            <Logo width={60} height={60}/>
          </div>
        </div>

          <div className="top-block">
            <h1 id="title-font">Login</h1>
          </div>
        </div>

        <div id="middle-container">
          <label>
          <div id="prof-container-1">
            <BiUser id="profile"/>
              <input  className="inputs" type="text" value={name} onChange={e => setName(e.target.value)} placeholder='email address'/>
          </div>
          </label>   

          <label>
          <div id="pwd-container-1">
            <AiOutlineUnlock id="password"/><input className="inputs" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password'/>
              <div id="pwd-container-2">
                <p id="forgot-pwd"><a href="#">Forgot password?</a></p>
            </div>
          </div>
        </label>  
           
        </div>

        {/*submit btn*/}
        <input className="btn" type="submit" value="Sign in"/>

        <div id="continue-container">
          <p id="continue">Or continue with</p>
          <hr id="line"/>
        </div>

        {/*link to main page*/}
        <Link to="/">
          <button>Main Page</button>
        </Link>
      </form>
      
        </div>
        <div id="svg-container">
    </div>
      </div>

    </>
  );
}
