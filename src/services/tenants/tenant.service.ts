import api from "@services/api.service";

import { GetTenantsResponseType, TenantType } from "@types/tenant.types";

type AddTenantType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export const handleAddTenant = async (data: AddTenantType) => {
  try {
    const response = await api.post<TenantType>("tenant", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleGetTenants = async () => {
  try {
    const response = await api.get<GetTenantsResponseType>("tenants");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleGetTenant = async (id: string) => {
  try {
    const response = await api.get<TenantType>(`tenant/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
