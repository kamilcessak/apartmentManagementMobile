import api from "@services/api.service";

import { GetApartmentsResponseType } from "@types/apartment.types";

export const handleGetApartments = async () => {
  try {
    const response = await api.get<GetApartmentsResponseType>("apartments");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
