import { Link, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "@emotion/react";

import { useStateContext } from "../providers/state-provider";
import { ColorModeSwitch } from "../elements/color-mode-switch";
import { Icon } from "./icon";
import drawer from "../config/drawer";
import useDesktop from "../providers/use-desktop";
import { getDesignTokens } from "../theme/theme";
import colors from "../theme/colors";
import { reporter } from "../config/reporter";

import logoLandkreisFd from "../assets/images/logos/logoLandkreisFd.svg";
import logoLandkreisFdDark from "../assets/images/logos/logoLandkreisFdDark.svg";
import starkregenFuldaLogo from "../assets/images/logos/starkregen-fulda-hor.svg";

export function ResponsiveDrawer({ mobileDrawerOpen, setMobileDrawerOpen }) {
  const { stateContext, setStateContext } = useStateContext();
  const darkTheme = createTheme(getDesignTokens("dark"));
  const theme = useTheme();

  const location = useLocation();

  const matchesDesktop = useDesktop();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setStateContext({
      ...stateContext,
      authToken: null,
      adminId: null,
      reporter: reporter.default,
    });
    console.log("logged out");
  };

  const drawerContent = (
    <>
      <List key="drawer-list" sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 8, mt: 5, mr: 2 }}>
          {" "}
          <img
            src={starkregenFuldaLogo}
            style={{
              width: "164px",
            }}
            sx={{ color: "white" }}
            alt="Starkregen-Fulda Logo"
          />
        </Box>

        {drawer.content.map((item) => (
          <Box key={item.title + "-box"} sx={{ mt: 3 }}>
            {item.authRequired === false || (item.authRequired === true && stateContext.authToken) ? (
              <MuiThemeProvider theme={darkTheme}>
                <ListItem key={item.title + "-list-item"} disablePadding>
                  <ListItemButton
                    key={item.title + "-list-item-button"}
                    component={Link}
                    to={item.url}
                    selected={item.url === location.pathname}
                  >
                    <ListItemIcon key={item.title + "-list-item-icon"}>
                      <Icon icon={item.icon} key={item.title + "-icon"} />
                    </ListItemIcon>
                    <ListItemText key={item.title + "-list-item-text"} primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </MuiThemeProvider>
            ) : null}
          </Box>
        ))}
        {stateContext.authToken ? (
          <Box
            color="inherit"
            aria-label="logout"
            // onClick={handleLogout}
            sx={{ mt: 3 }}
          >
            <MuiThemeProvider theme={darkTheme}>
              <ListItem key={"logout-list-item"} disablePadding>
                <ListItemButton key={"logout-list-item-button"} onClick={handleLogout}>
                  <ListItemIcon key={"logout-list-item-icon"}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText key={"logout-list-item-text"} primary={"Logout"} />
                </ListItemButton>
              </ListItem>
            </MuiThemeProvider>
          </Box>
        ) : null}
      </List>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pb: 5 }}>
        <ColorModeSwitch />
        <a href="https://www.landkreis-fulda.de/start">
          <img
            src={theme.palette.mode === "light" ? logoLandkreisFd : logoLandkreisFdDark}
            style={{
              width: "100%",
              paddingLeft: 52,
              paddingRight: 52,
              paddingTop: 16,
              paddingBottom: 16,
              backgroundColor: theme.palette.mode === "light" ? "white" : colors.backgroundDark,
            }}
            alt="Logo Landkreis Fulda"
          />
        </a>
      </Box>
    </>
  );

  return (
    <>
      {matchesDesktop ? (
        <Drawer
          key="desktop-drawer"
          variant="permanent"
          sx={{
            width: drawer.width,
            flexShrink: 0,
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawer.width,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer key="mobile-drawer" anchor="left" open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)}>
          <Box
            sx={{
              width: drawer.width,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            role="presentation"
            onClick={() => setMobileDrawerOpen(false)}
            onKeyDown={() => setMobileDrawerOpen(false)}
          >
            {drawerContent}
          </Box>
        </Drawer>
      )}
    </>
  );
}
