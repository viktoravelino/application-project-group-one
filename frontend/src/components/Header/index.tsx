import React, { useState } from "react";
import { LogoSvg } from "../Icons";

export const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      className="
    header-container drop-shadow-sm border-black border-0 w-full bg-gray-800 text-white
    flex justify-between p-2 top-0 fixed z-10 h-12 px-3
    md:h-16
    "
    >
      {/* logo */}
      <div className="logo-container border-black border-0">
        <a href="#">
          <LogoSvg invert height={"100%"} />
        </a>
      </div>
      {/* brand name */}
      <div className="brand-name-container border-black border-2">brand</div>

      {/* user icon */}
      <div className="user-icon-container border-black border-2">user</div>
    </header>
  );
};

interface UserDropdownItemProps {
  text: string;
  path: string;
}

const UserDropdownItem = ({ path, text }: UserDropdownItemProps) => {
  return (
    //   TODO: Change to react router link
    <a
      href={path}
      className="p-2  text-white text-sm no-underline hover:no-underline block border-b-2 border-gray-700 hover:border-brand-green"
    >
      {text}
    </a>
  );
};
