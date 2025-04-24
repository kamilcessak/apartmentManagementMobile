import { useQuery } from "@tanstack/react-query";

import api from "@services/api.service";

export const useUserData = () => {
  const fetchUser = async () => {
    const response = await api.get("user");
    return response.data;
  };

  const userQuery = useQuery({
    queryFn: fetchUser,
    queryKey: ["user"],
  });

  return userQuery;
};
