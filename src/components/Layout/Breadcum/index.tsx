import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function index() {
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
  });
  const pathname = usePathname(); // Detect route changes

  useEffect(() => {
    // Update metadata whenever the route changes
    const title = document.title;
    const description =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || "";

    setMetadata({ title, description });
  }, [pathname]); // Re-run the effect on route change
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          m: 1,
          color: "primary.main",
          textTransform: "uppercase",
        }}
      >
        {metadata.description}
      </Typography>
    </Box>
  );
}

export default index;
