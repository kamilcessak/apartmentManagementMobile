import "styled-components/native";
import { styledTheme } from "./styledTheme";

type ThemeType = typeof styledTheme;

declare module "styled-components/native" {
  export interface DefaultTheme extends ThemeType {}
}
