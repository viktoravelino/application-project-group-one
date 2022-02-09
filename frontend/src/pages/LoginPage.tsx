import React, {useState} from "react";
import { Link } from "react-router-dom";
import './LoginPage.css';
//importing logo
import Logo from '../components/Logo';

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
            <Logo width={50} height={50}/>
          </div>
        </div>
        <div className="top-block">
          <h1 id="title-font">Login</h1>
        </div>
      </div>

          <label className="inputs">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='email address'/>
          </label>   
          <br/>

          <label className="inputs">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password'/>
            <p id="forgot-pwd">Forgot password? <a href="#">Click Here</a></p>
          </label>   
          <br/>

        {/*submit btn*/}
        <input className="btn" type="submit" value="Sign in"/>
        <br/>
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
