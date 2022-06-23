import { useMediaQuery } from "@mui/material";
/* -------------------------------------------------------------------------- */

const useDesktop = () => {
  return useMediaQuery("(min-width:900px)");
};

export default useDesktop;
