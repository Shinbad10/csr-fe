import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {"Copyright © "}
      VISI - MẮT SÁNG CỘNG ĐỒNG {new Date().getFullYear()}.
    </Typography>
  );
}
