import { useMediaQuery } from "@mui/material";
/* -------------------------------------------------------------------------- */

const useMediumWidth = () => {
  return useMediaQuery("(min-width:1100px)");
};

export default useMediumWidth;
