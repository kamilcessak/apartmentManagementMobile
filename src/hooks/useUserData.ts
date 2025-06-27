import { useQuery } from "@tanstack/react-query";

import api from "@services/api.service";
import { UserType } from "@typings/user.types";

export const useUserData = () => {
  const fetchUser = async () => {
    const response = await api.get<UserType>("user");
    return response.data;
  };

  const userQuery = useQuery({
    queryFn: fetchUser,
    queryKey: ["user"],
  });

  return userQuery;
};
