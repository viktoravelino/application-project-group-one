import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogoSvg } from "../Icons";

export const Header = () => {
  const { logoutUser } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

//icon
const sunIcon =document.querySelector(".sun");
const moonIcon =document.querySelector(".moon");

//theme
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

//toggling
const iconToggle =() => {
moonIcon?.classList.toggle("display-none");
sunIcon?.classList.toggle("display-none");
};

//them check
const themeCheck = () => {
  if(userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add ("dark");
    moonIcon?.classList.add ("display-none");
    return;
  }
  sunIcon?.classList.add("display-none");
};

//manual them switch

const themeSwitch=() => {
  if (document.documentElement.classList.contains("dark")){
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme","light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme","dark");
    iconToggle();
 };

sunIcon?.addEventListener("click",()=> {themeSwitch();} );
moonIcon?.addEventListener("click", ()=>{themeSwitch();});

themeCheck();


  return (
    <header
      className="
    header-container drop-shadow-sm border-black border-0 w-full bg-gray-800 text-white
    flex justify-between items-center p-2 top-0 fixed z-10 h-12 px-3
    md:h-16 md:px-8  dark:bg-gray-500
    "
    > 
    
      {/* logo */}
      <div className="logo-container border-black border-1 h-full">
        <a href="/">
          <LogoSvg invert height={"100%"} />
        </a>
      </div>
      {/* brand name */}
      <div
        className="
        mr-auto
        ml-4
        md:m-0
      brand-name-container border-black border-0
      text-2xl
      "
      >
        Walletal
      </div>

      {/*dark/Light */}
      <div className="button" onClick={themeSwitch}>
      <svg
        className="ml-4 h-5 fill-current inline rounded bg-gray-400  dark:bg-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
          >
      <path d="M9.36077 3.29289C9.6659 3.59801 9.74089 4.06444 9.54678 4.44982C9.04068 5.45468 8.75521 6.59034 8.75521 7.79556C8.75521 11.9097 12.0903 15.2448 16.2044 15.2448C17.4097 15.2448 18.5453 14.9593 19.5502 14.4532C19.9356 14.2591 20.402 14.3341 20.7071 14.6392C21.0122 14.9443 21.0872 15.4108 20.8931 15.7962C19.3396 18.8806 16.1428 21 12.4492 21C7.23056 21 3 16.7694 3 11.5508C3 7.85718 5.11941 4.66038 8.20384 3.10688C8.58923 2.91278 9.05565 2.98777 9.36077 3.29289ZM6.8217 6.66959C5.68637 7.9774 5 9.6843 5 11.5508C5 15.6649 8.33513 19 12.4492 19C14.3157 19 16.0226 18.3136 17.3304 17.1783C16.9611 17.2222 16.5853 17.2448 16.2044 17.2448C10.9858 17.2448 6.75521 13.0142 6.75521 7.79556C6.75521 7.41471 6.77779 7.03895 6.8217 6.66959Z" fill="#FFFFFF" />
      </svg>
      <svg
        className="ml-3 h-5 fill-current inline  rounded  dark:bg-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
          >
      <path d="M12 2C12.5523 2 13 2.44772 13 3V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V3C11 2.44772 11.4477 2 12 2ZM19.0711 4.92893C19.4616 5.31945 19.4616 5.95261 19.0711 6.34314L18.364 7.05025C17.9735 7.44077 17.3403 7.44077 16.9498 7.05025C16.5593 6.65972 16.5593 6.02656 16.9498 5.63603L17.6569 4.92893C18.0474 4.5384 18.6806 4.5384 19.0711 4.92893ZM4.92893 4.92893C5.31945 4.5384 5.95262 4.5384 6.34314 4.92893L7.05025 5.63603C7.44077 6.02656 7.44077 6.65972 7.05025 7.05025C6.65972 7.44077 6.02656 7.44077 5.63603 7.05025L4.92893 6.34314C4.5384 5.95262 4.5384 5.31945 4.92893 4.92893ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12ZM2 12C2 11.4477 2.44772 11 3 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H3C2.44772 13 2 12.5523 2 12ZM19 12C19 11.4477 19.4477 11 20 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H20C19.4477 13 19 12.5523 19 12ZM5.63603 16.9497C6.02656 16.5592 6.65972 16.5592 7.05025 16.9497C7.44077 17.3403 7.44077 17.9734 7.05025 18.364L6.34314 19.0711C5.95262 19.4616 5.31945 19.4616 4.92893 19.0711C4.5384 18.6805 4.5384 18.0474 4.92893 17.6568L5.63603 16.9497ZM16.9498 18.364C16.5593 17.9734 16.5593 17.3403 16.9498 16.9497C17.3403 16.5592 17.9735 16.5592 18.364 16.9497L19.0711 17.6568C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711C18.6806 19.4616 18.0474 19.4616 17.6569 19.0711L16.9498 18.364ZM12 19C12.5523 19 13 19.4477 13 20V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V20C11 19.4477 11.4477 19 12 19Z" fill="#FFFFFF"></path>
      </svg>
  </div>



      {/* user icon */}
      <div className="user-icon-container border-black border-0 hidden md:inline-block">
        <div className="user-container">
          <div className="relative inline-block">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="drop-button text-white py-2 px-2 hover:bg-gray-700 hover:rounded-lg
              flex flex-row items-center"
            >
              <BiUserCircle />
              <svg
                className="ml-2 h-3 fill-current inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <div
              id="myDropdown"
              className={`min-h-fit rounded-xl absolute bg-gray-800 text-white right-0 mt-5 p-3 overflow-auto z-30 dark:bg-gray-500 ${
                showUserMenu ? "" : "invisible"
              }`}
            >
              <UserDropdownItem path="/user-profile" text="Profile" />
              {/* <UserDropdownItem path="#" text="Settings" /> */}
              <UserDropdownItem onClick={logoutUser} path="#" text="Log Out" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface UserDropdownItemProps {
  text: string;
  path: string;
  onClick?: () => void;
}

const UserDropdownItem = ({ path, text, onClick }: UserDropdownItemProps) => {
  return (
    //   TODO: Change to react router link
    <Link
      onClick={onClick}
      to={path}
      className="p-2  text-white text-sm 
      no-underline hover:no-underline block border-b-2 
      border-gray-700 hover:text-green-500 whitespace-nowrap
      "
    >
      {text}
    </Link>
  );
};



