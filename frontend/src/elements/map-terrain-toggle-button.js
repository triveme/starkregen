import { Button } from "@mui/material";

import { useColorModeContext } from "../providers/theme-provider";

import lightMapImg from "../assets/images/maps/light_prev.png";
import darkMapImg from "../assets/images/maps/dark_prev.png";
import satelliteImg from "../assets/images/maps/satellite_prev.jfif";

export function MapTerrainToggleButton({ satellite, onMapChange }) {
  const { colorMode } = useColorModeContext();

  return (
    <Button
      variant="contained"
      onClick={onMapChange}
      sx={{ ml: 2, mt: 2, borderRadius: 2, p: "3px", backgroundColor: "background.default" }}
    >
      <img
        src={!satellite ? satelliteImg : colorMode === "light" ? lightMapImg : darkMapImg}
        alt="map"
        style={{ width: "75px", height: "75px", borderRadius: 3, objectFit: "none" }}
      ></img>
    </Button>
  );
}
