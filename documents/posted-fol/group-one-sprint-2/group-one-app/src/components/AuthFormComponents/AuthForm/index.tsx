import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LogoSvg } from "../../Icons";

interface AuthFormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export const AuthForm = ({ children, onSubmit }: AuthFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 border-2 border-black flex flex-col  gap-4 items-center text-center w-full max-w-xs rounded-xl"
    >
      {children}
    </form>
  );
};

interface HeaderProps {
  title: string;
}
AuthForm.Header = ({ title }: HeaderProps) => {
  return (
    <header>
      <div className="form-header-logo flex justify-center">
        <LogoSvg height="60" width="60" />
      </div>
      <h2 className="form-header-title font-bold text-2xl mt-5">{title}</h2>
    </header>
  );
};

interface BodyProps {
  showSpanLink?: boolean;
  spanLinkText?: string;
  spanLinkPath?: string;
  children?: ReactNode;
}
AuthForm.Body = ({
  children,
  showSpanLink,
  spanLinkText,
  spanLinkPath,
}: BodyProps) => {
  return (
    <main className="flex flex-col gap-3">
      {children}
      {showSpanLink && (
        <Link to={spanLinkPath || "#"} className="self-end text-xs underline">
          {spanLinkText}
        </Link>
      )}
    </main>
  );
};

AuthForm.Buttons = ({ children }: any) => {
  return (
    <div className="buttons flex flex-col gap-5 w-full items-center">
      {children}
    </div>
  );
};

interface FooterProps {
  text: string;
  textLink: string;
  to: string;
}
AuthForm.Footer = ({ text, textLink, to }: FooterProps) => {
  return (
    <span className="text-xs mt-2">
      {text}
      <Link to={to} className="underline">
        {textLink}
      </Link>
    </span>
  );
};
