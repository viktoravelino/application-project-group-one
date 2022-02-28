import { ReactNode } from "react";

interface CenterContainerAuthFormProps {
  children: ReactNode;
}

export const CenteredContainerAuthForm = ({
  children,
}: CenterContainerAuthFormProps) => {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-bgColor">
      {children}
    </div>
  );
};
