const customColors = {
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

export const styledTheme = {
  colors: customColors,
};

export type ThemeType = typeof styledTheme;
export interface DefaultTheme extends ThemeType {}
