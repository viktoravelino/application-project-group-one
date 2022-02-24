import React, { HTMLAttributes, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
  Icon,
  placeholder,
  value,
  onChange,
  ...props
}: InputProps & HTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative mt-2">
      <span className="absolute inset-y-0 inline-flex items-center">
        <Icon className="text-primaryColor " />
      </span>

      <input
        {...props}
        className="w-full p-0 pl-6 text-sm outline-0 border-b border-primaryColor text-left pb-1"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
