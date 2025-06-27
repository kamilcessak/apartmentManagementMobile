import api from "@services/api.service";

import {
  CreateApartmentType,
  GetApartmentResponseType,
  GetApartmentsResponseType,
} from "@typings/apartment.types";

export const handleGetApartments = async () => {
  try {
    const response = await api.get<GetApartmentsResponseType>("apartments");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleGetApartment = async (id: string) => {
  try {
    const response = await api.get<GetApartmentResponseType>(`apartment/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleCreateApartment = async (data: CreateApartmentType) => {
  try {
    const response = await api.post(`apartment`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
