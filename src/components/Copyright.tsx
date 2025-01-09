import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
        position: "absolute",
        bottom: 0,
      }}
    >
      {"Copyright © "}
        VISI - MẮT SÁNG CỘNG ĐỒNG
      {" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
