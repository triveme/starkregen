import colors from "./colors";

export const getDesignTokens = (mode) => ({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: mode === "light" ? colors.backgroundLight : colors.backgroundDark,
      paper: mode === "light" ? colors.backgroundLight : colors.paperDark,
    },
    error: {
      main: colors.rejected,
    },
    mode,
  },
  typography: {
    fontFamily: ["Lato", "Helvetica", "Arial", "sans-serif"].join(","),
    body1: {
      fontSize: "0.9rem",
    },
  },
  components: {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          minHeight: "12px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 0,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: mode === "light" ? colors.white : colors.paperDark,
        },
        containedSecondary: {
          color: mode === "light" ? colors.white : colors.paperDark,
        },
        containedError: {
          color: mode === "light" ? colors.white : colors.paperDark,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-colorDefault": {
            background: mode === "light" ? colors.white : colors.grey,
            boxShadow:
              "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: colors.primaryFifth,
            borderLeft: "5px solid " + colors.primary,
            paddingLeft: 16,
          },
          paddingLeft: 21,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: colors.primaryFifth,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          ...(mode === "light" ? { background: colors.primary } : { background: colors.drawerDark }),
          border: "none",
          borderRadius: 0,
          color: "white",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: mode === "light" ? { background: colors.primary } : { background: colors.drawerDark },
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ["Lato", "Helvetica", "Arial", "sans-serif"].join(","),
          lineHeight: 1.5, // maybe default already?
          "&::first-line": {
            // if text only contains one line, set lineHeight to normal
            lineHeight: "normal",
          },
        },
        h1: {
          fontSize: "2.5rem",
          fontWeight: 500,
        },
        h2: {
          fontSize: "1.2rem",
          fontWeight: 400,
        },
        h3: {
          fontSize: "1.2rem",
          fontWeight: 600,
        },
      },
    },
  },
});
