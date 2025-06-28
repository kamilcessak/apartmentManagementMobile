import { getNetworkStateAsync } from "expo-network";

export const useOfflineMode = () => {
  const getNetworkState = async () => {
    const { isConnected, isInternetReachable } = await getNetworkStateAsync();
    return isConnected && isInternetReachable;
  };

  return { isOffline: void getNetworkState() };
};
