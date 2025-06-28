import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TenantType } from "@typings/tenant.types";

export type ApartmentsContextType = {
  tenants: TenantType[] | null;
  setTenants: Dispatch<SetStateAction<TenantType[] | null>>;
};

export const TenantsContext = createContext<ApartmentsContextType | null>(null);

export const TenantsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tenants, setTenants] = useState<TenantType[] | null>(null);

  const value = {
    tenants,
    setTenants,
  };

  return (
    <TenantsContext.Provider value={value}>{children}</TenantsContext.Provider>
  );
};

export const useTenantsContext = () => {
  const context = useContext(TenantsContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
