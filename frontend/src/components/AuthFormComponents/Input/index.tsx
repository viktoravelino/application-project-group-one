import React from "react";
import { IconType } from "react-icons";
import { BiUser } from "react-icons/bi";

interface InputProps {
  Icon: IconType;
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({ Icon, placeholder, value, onChange }: InputProps) => {
  return (
    <div className="relative mt-2 p-3">
      <span className="absolute inset-y-0 inline-flex items-center left-12 bottom-0">
        <Icon className="text-primaryColor " />
      </span>

      <input
        className="w-4/5 p-0 pl-30 text-sm outline-0 border-b border-primaryColor text-center"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
