import React from "react";

export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      className="block px-5 py-3 text-sm font-medium text-white bg-primaryColor rounded-btn w-5/6 mb-3"
    >
      {props.children}
    </button>
  );
};
