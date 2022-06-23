import { createContext, useState, useMemo, useContext } from "react";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../theme/theme";

export const ColorModeContext = createContext(
  typeof window !== "undefined"
    ? localStorage.getItem("color-mode")
      ? localStorage.getItem("color-mode")
      : "light"
    : "light",
);

export const useColorModeContext = () => useContext(ColorModeContext);

export function ThemeProvider({ children }) {
  const [colorMode, setColorMode] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("color-mode")
        ? localStorage.getItem("color-mode")
        : "light"
      : "light",
  );
  const theme = useMemo(() => createTheme(getDesignTokens(colorMode)), [colorMode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
