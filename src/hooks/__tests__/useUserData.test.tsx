import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useUserData } from "@hooks/useUserData";
import api from "@services/api.service";

jest.mock("@services/api.service", () => ({
  get: jest.fn(),
}));

const mockedApiGet = api.get as jest.Mock;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("TEST: useUserData", () => {
  beforeEach(() => {
    mockedApiGet.mockReset();
  });

  it("Should get user data", async () => {
    const mockUserData = {
      email: "test@test.test",
      isEmailVerified: false,
      phoneNumber: "123456789",
      role: "Landlord",
      _id: "1",
      apartments: [{ isAvailable: true }],
    };
    mockedApiGet.mockResolvedValueOnce({ data: mockUserData });

    const { result } = renderHook(() => useUserData(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUserData);
    expect(mockedApiGet).toHaveBeenCalledWith("user");
  });

  it("Should render errors", async () => {
    const errorMessage = "Network error";
    mockedApiGet.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useUserData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error(errorMessage));
  });
});
