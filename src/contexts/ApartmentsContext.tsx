import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ApartmentType } from "@typings/apartment.types";

export type ApartmentsContextType = {
  apartments: ApartmentType[] | null;
  setApartments: Dispatch<SetStateAction<ApartmentType[] | null>>;
};

export const ApartmentContext = createContext<ApartmentsContextType | null>(
  null
);

export const ApartmentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [apartments, setApartments] = useState<ApartmentType[] | null>(null);

  const value = {
    apartments,
    setApartments,
  };

  return (
    <ApartmentContext.Provider value={value}>
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartmentsContext = () => {
  const context = useContext(ApartmentContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
