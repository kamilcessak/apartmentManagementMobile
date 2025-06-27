import api from "@services/api.service";
import { UserType } from "@typings/user.types";

type PatchProfileResponseType = UserType;

export const handleUpdateProfile = async (data: any) => {
  try {
    const response = await api.patch<PatchProfileResponseType>(`user`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
