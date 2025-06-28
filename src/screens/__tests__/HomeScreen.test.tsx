import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { act } from "@testing-library/react-hooks";

import { HomeScreen } from "@screens/HomeScreen";
import { useUserData } from "@hooks/useUserData";
import { useAppContext } from "@contexts/AppContext";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const mockUseBottomTabBarHeight = useBottomTabBarHeight as jest.Mock;
const mockUseAppContext = useAppContext as jest.Mock;

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useFocusEffect: jest.fn(),
}));

jest.mock("@contexts/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("@react-navigation/bottom-tabs", () => ({
  useBottomTabBarHeight: jest.fn(),
}));

jest.mock("react-native-paper", () => {
  const realModule = jest.requireActual("react-native-paper");
  return {
    ...realModule,
    useTheme: jest.fn(),
    Icon: jest.fn(() => null),
    Text: jest.fn((props) => <realModule.Text {...props} />),
    Button: jest.fn(({ onPress, children, ...props }) => (
      <realModule.Button {...props} onPress={onPress} children={children} />
    )),
  };
});

jest.mock("@hooks/useUserData", () => ({
  useUserData: jest.fn(),
}));

const mockUseNavigation = useNavigation as jest.Mock;
const mockUseTheme = useTheme as jest.Mock;
const mockUseUserData = useUserData as jest.Mock;

describe("TEST: HomeScreen", () => {
  const mockNavigate = jest.fn();
  const mockSetOptions = jest.fn();
  const mockGetParent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAppContext.mockReturnValue({
      setbottomTabHeight: jest.fn(),
    });

    mockUseBottomTabBarHeight.mockReturnValue(56);

    mockUseNavigation.mockReturnValue({
      navigate: mockNavigate,
      getParent: mockGetParent.mockReturnValue({
        setOptions: mockSetOptions,
      }),
    });

    mockUseTheme.mockReturnValue({
      colors: {
        customBackground: "#000",
        customSecondary: "#333",
        customSuccess: "#0f0",
      },
    });

    mockUseUserData.mockReturnValue({
      data: {
        email: "test@test.test",
        isEmailVerified: true,
        phoneNumber: "123456789",
        role: "Landlord",
        _id: "1",
        firstName: "Kamil",
        lastName: "Cessak",
        apartments: [
          { isAvailable: true },
          { isAvailable: false },
          { isAvailable: true },
        ],
      },
    });
  });

  it("Should render homescreen correctly", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Witaj Kamil w ApartmentManagement!")).toBeTruthy();

    expect(
      getByText("2/3 apartamentów jest dostępnych do wynajęcia.")
    ).toBeTruthy();

    expect(getByText("Dodaj apartament")).toBeTruthy();
    expect(getByText("Dodaj najemce")).toBeTruthy();
    expect(getByText("Zaktualizuj profil")).toBeTruthy();
  });

  it("Should handle navigation onPress", () => {
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText("Dodaj apartament"));
    expect(mockNavigate).toHaveBeenCalledWith("Flats", {
      screen: "NewApartment",
    });

    fireEvent.press(getByText("Dodaj najemce"));
    expect(mockNavigate).toHaveBeenCalledWith("Tenants", {
      screen: "NewTenant",
    });

    fireEvent.press(getByText("Zaktualizuj profil"));
    expect(mockNavigate).toHaveBeenCalledWith("SettingsStack", {
      screen: "ProfileSettings",
    });
  });

  it("Should calculate available apartments correctly", () => {
    const mockUserData = {
      email: "test@test.test",
      isEmailVerified: false,
      phoneNumber: "123456789",
      role: "Landlord",
      _id: "1",
      apartments: [
        { isAvailable: true },
        { isAvailable: true },
        { isAvailable: false },
      ],
    };

    mockUseUserData.mockReturnValue({
      data: mockUserData,
    });

    const { getByText } = render(<HomeScreen />);
    expect(
      getByText("2/3 apartamentów jest dostępnych do wynajęcia.")
    ).toBeTruthy();
  });

  it("Should correctly display empty user data", () => {
    mockUseUserData.mockReturnValue({ data: null });

    const { getByText } = render(<HomeScreen />);
    expect(getByText("Witaj  w ApartmentManagement!")).toBeTruthy();
    expect(
      getByText(
        "undefined/undefined apartamentów jest dostępnych do wynajęcia."
      )
    ).toBeTruthy();
  });
});
