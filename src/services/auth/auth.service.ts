import api from "@services/api.service";

type LoginType = {
  email: string;
  password: string;
};

export const handleLogin = async (data: LoginType) => {
  try {
    const response = api.post("login", data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
