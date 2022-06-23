import { Chip } from "@mui/material";

import colors from "../theme/colors";

export default function StatusChip({ label }) {
  let color = colors.primaryDark;

  switch (label) {
    case "active":
      color = colors.primary;
      break;
    case "pending":
      color = colors.primaryDark;
      break;
    case "hidden":
      color = colors.rejected;
      break;
    default:
      color = colors.primaryDark;
  }

  return <Chip label={label} color="primary" sx={{ backgroundColor: color }} />;
}
