import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grow from "@mui/material/Grow";
import { Tooltip } from "@mui/material";

import { Icon } from "../components/icon";
import { useStateContext } from "../providers/state-provider";
import { categories as categoriesConfig } from "../config/reporter";

export function FilterChip({ category, categoryIcon, categoryDescription }) {
  const { stateContext, setStateContext } = useStateContext();
  const categories = stateContext.selectedCategories;

  const handleClick = () => {
    const index = categories.indexOf(category);
    let newCategories = [];
    if (index === -1) {
      newCategories = [category];
    } else {
      newCategories = [categoriesConfig.all];
    }

    setStateContext({
      ...stateContext,
      selectedCategories: newCategories,
    });
  };

  return categories && (categories.includes(category) || categories.includes(categoriesConfig.all)) ? (
    <Grow in={categories && (categories.includes(category) || categories.includes(categoriesConfig.all))}>
      <Tooltip title={categoryDescription} placement="top">
        <Chip
          onClick={handleClick}
          onDelete={categories && categories.includes(category) ? handleClick : null}
          label={
            <Typography
              variant="body2"
              component="div"
              sx={{ display: "flex", alignItems: "center", fontSize: "12px" }}
            >
              <Icon icon={categoryIcon} props={{ fontSize: "small", sx: { mr: 1 } }} />
              {category}
            </Typography>
          }
          color={categories.includes(category) ? "secondary" : "default"}
          sx={{
            pointerEvents: "all",
          }}
        />
      </Tooltip>
    </Grow>
  ) : null;
}
