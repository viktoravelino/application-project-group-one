import { ReactNode } from "react";
import { IconType } from "react-icons";

interface SideMenuProps {
  children?: ReactNode;
}

export const SideMenu = ({ children }: SideMenuProps) => {
  return (
    <aside
      className="
      side-menu-container
      shrink-0
      px-2 md:px-0
      bg-gray-800 shadow-black shadow-lg
      h-20 fixed bottom-0 w-full
      md:relative md:h-screen md:w-48
      text-white
    "
    >
      <nav className="h-full md:fixed md:mt-4 md:w-48">
        <ul
          className="
        flex flex-row justify-around h-full items-center
        md:flex-col md:items-stretch md:justify-start md:p-1
        "
        >
          {children}
        </ul>
      </nav>
    </aside>
  );
};

interface SideMenuItemProps {
  text: string;
  to: string;
  Icon: IconType;
}

export const SideMenuItem = ({ text, to, Icon }: SideMenuItemProps) => {
  return (
    <li className="flex-0 md:flex-none text-xs md:text-base w-full">
      <a
        href={to}
        className="
      flex flex-col items-center hover:bg-green-400 py-2 px-2 rounded-lg
      md:flex-row md:mb-1 md:items-center md:pl-4
      "
      >
        <Icon
          className="
        mb-2 text-2xl
        md:mr-3 md:mb-0
        "
        />
        <span>{text}</span>
      </a>
    </li>
  );
};
