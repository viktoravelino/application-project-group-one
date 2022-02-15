import React from "react";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
}

export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
) => {
  let colorClasses = "bg-green-500 hover:bg-green-600 text-white";

  if (props.secondary) {
    colorClasses = "bg-gray-500 hover:bg-gray-600 text-white";
  } else if (props.primary) {
    colorClasses = colorClasses;
  }

  return (
    <button
      {...props}
      className={`${colorClasses} font-bold py-2 px-4 rounded ${props.className}`}
    >
      {props.children}
    </button>
  );
};
