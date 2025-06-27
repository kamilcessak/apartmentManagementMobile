import api from "@services/api.service";

type GetFileResponseType = {
  url: string;
};

export const handleGetFile = async (filename: string) => {
  try {
    const response = await api.get<GetFileResponseType>(`upload/${filename}`);
    return response.data.url;
  } catch (error) {
    throw error;
  }
};
