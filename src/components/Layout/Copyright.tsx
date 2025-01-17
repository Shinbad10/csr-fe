import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Copyright() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        py: 0.5, // Padding for better spacing
        textAlign: "center",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)", // Optional shadow for styling
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
        }}
      >
        {"Copyright © "}
        VISI - MẮT SÁNG CỘNG ĐỒNG {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
