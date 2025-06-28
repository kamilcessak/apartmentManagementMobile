import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { UserType } from "@typings/user.types";

export type AppContextType = {
  user: UserType | null;
  bottomTabHeight: number | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  setbottomTabHeight: React.Dispatch<React.SetStateAction<number | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [bottomTabHeight, setbottomTabHeight] = useState<number | null>(null);

  const value = {
    user,
    setUser,
    bottomTabHeight,
    setbottomTabHeight,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
