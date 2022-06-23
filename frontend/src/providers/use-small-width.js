import { useMediaQuery } from "@mui/material";
/* -------------------------------------------------------------------------- */

const useSmallWidth = () => {
  return useMediaQuery("(min-width:400px)");
};

export default useSmallWidth;
