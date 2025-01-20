import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ | VISI - CSR",
  description: "Phần mềm quản lý khám tầm soát",
};
export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Trang chủ
      </Box>
    </Container>
  );
}
