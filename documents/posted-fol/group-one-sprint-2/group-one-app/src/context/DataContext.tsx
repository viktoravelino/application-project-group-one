import { createContext, FC, useContext } from "react";

// Define context types for TypeScript
interface DataContextInterface {}

// Initialize the context values with empty values
const initialContext: DataContextInterface = {};

// Create the context using empty values initialized before
const DataContext = createContext<DataContextInterface>(initialContext);

// Create a custom hook to make it easier to use through the application
export const useDataContext = () =>
  useContext<DataContextInterface>(DataContext);

export const DataContextProvider: FC = ({ children }: any) => {
  // code goes here

  const contextValue: DataContextInterface = {};
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
