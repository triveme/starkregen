import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";

import { useStateContext } from "../providers/state-provider";
import { ResponsiveDrawer } from "./responsive-drawer";
import { Icon } from "./icon";
import starkregenFuldaLogo from "../assets/images/logos/starkregen-fulda-hor.svg";
import { reporter } from "../config/reporter";
import useDesktop from "../providers/use-desktop";

export function MenuBar() {
  const { stateContext, setStateContext } = useStateContext();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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

  return (
    <>
      {matchesDesktop ? null : (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}>
          <Toolbar sx={{ pr: 1.5, pl: 1.5 }}>
            <Box
              color="inherit"
              aria-label="open drawer"
              onClick={() => (mobileDrawerOpen ? setMobileDrawerOpen(false) : setMobileDrawerOpen(true))}
              // edge="start"
              sx={{
                mr: 1,
                lineHeight: "normal",
                display: { xs: "block", md: "none" },
                cursor: "pointer",
              }}
            >
              <Icon icon="menu" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, mr: 1 }}>
              {" "}
              <img
                src={starkregenFuldaLogo}
                style={{
                  width: "120px",
                }}
                sx={{ color: "white" }}
                alt="Starkregen-Fulda Logo"
              />
            </Box>
            {stateContext.authToken ? (
              <Box
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
                sx={{ ml: 1, lineHeight: "normal", cursor: "pointer" }}
              >
                <LogoutIcon />
              </Box>
            ) : null}
          </Toolbar>
        </AppBar>
      )}
      <ResponsiveDrawer mobileDrawerOpen={mobileDrawerOpen} setMobileDrawerOpen={setMobileDrawerOpen} />
    </>
  );
}
