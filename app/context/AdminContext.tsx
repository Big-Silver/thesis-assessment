import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AdminContextProps = {
  updateState: boolean;
  setUpdateState: Dispatch<SetStateAction<boolean>>;
};

type AdminContextProviderProps = {
  children: ReactNode;
};

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminContextProvider: React.FC<AdminContextProviderProps> = ({
  children,
}) => {
  const [updateState, setUpdateState] = useState<boolean>(false);

  useEffect(() => {
    // Add any initialization logic if needed
  }, []);

  return (
    <AdminContext.Provider
      value={{
        updateState,
        setUpdateState,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
