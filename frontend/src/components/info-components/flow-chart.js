import React from "react";

import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ArrowDownward } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

import colors from "../../theme/colors";

const iconContainerHorizontalStyling = { display: "flex", alignItems: "center" };
const iconContainerVerticalStyling = { display: "flex", justifyContent: "center" };
const textContainerStyling = {
  borderRadius: 2,
  padding: 3,
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export function FlowChart({ texts, vertical }) {
  const theme = useTheme();

  return (
    <Stack direction={vertical ? "column" : "row"} spacing={1} alignItems="stretch" justifyContent="center">
      {texts
        ? texts.length > 0
          ? texts.map((text, index) => {
              return (
                <React.Fragment key={`flow-element-${index}`}>
                  <Box
                    key={`flow-text-${index}`}
                    sx={{
                      ...textContainerStyling,
                      backgroundColor: theme.palette.mode === "light" ? colors.lightBlueDark : colors.lightBlueLight,
                      color: colors.white,
                    }}
                  >
                    {text}
                  </Box>
                  {index < texts.length - 1 ? (
                    <Box
                      key={`flow-arrow-${index}`}
                      sx={vertical ? iconContainerVerticalStyling : iconContainerHorizontalStyling}
                    >
                      {vertical ? <ArrowDownward /> : <ArrowForwardIcon />}
                    </Box>
                  ) : null}
                </React.Fragment>
              );
            })
          : null
        : null}
    </Stack>
  );
}
