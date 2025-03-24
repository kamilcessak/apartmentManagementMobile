import { CustomMD3Theme } from "@styles/theme";

declare global {
  namespace ReactNativePaper {
    interface Theme extends CustomMD3Theme {}
  }
}
