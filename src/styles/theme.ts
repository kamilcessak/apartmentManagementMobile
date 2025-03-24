import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";

interface CustomThemeColors {
  customPrimary: string;
  customSecondary: string;
  customBackground: string;
  customBlack: string;
  customError: string;
  customSuccess: string;
  grayPrimary: string;
  graySecondary: string;
  grayTertiary: string;
}

export interface CustomMD3Theme extends MD3Theme {
  colors: MD3Theme["colors"] & CustomThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
}

const customColors: CustomThemeColors = {
  customPrimary: "#428bca",
  customSecondary: "#5bc0de",
  customBackground: "#f9f9f9",
  customBlack: "#0e1111",
  customError: "#d9534f",
  customSuccess: "#5cb85c",
  grayPrimary: "#d2d4dc",
  graySecondary: "#c0c2ce",
  grayTertiary: "#afafaf",
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const borderRadius = {
  small: 4,
  medium: 8,
  large: 16,
};

export const CustomLightTheme: CustomMD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
  },
  spacing,
  borderRadius,
};

export const CustomDarkTheme: CustomMD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors,
  },
  spacing,
  borderRadius,
};

export const theme: CustomMD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
  },
  spacing,
  borderRadius,
};
