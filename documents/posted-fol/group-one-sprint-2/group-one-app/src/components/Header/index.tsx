import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogoSvg } from "../Icons";

export const Header = () => {
  const { logoutUser } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      className="
    header-container drop-shadow-sm border-black border-0 w-full bg-gray-800 text-white
    flex justify-between items-center p-2 top-0 fixed z-10 h-12 px-3
    md:h-16 md:px-8
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
              className={`min-h-fit rounded-xl absolute bg-gray-800 text-white right-0 mt-5 p-3 overflow-auto z-30 ${
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
