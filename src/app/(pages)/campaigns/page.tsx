import * as React from "react";
import Box from "@mui/material/Box";
import type { Metadata } from "next";
import TableEmployee from "../../../components/DataTable/Tables/EmployeeTable";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
export const metadata: Metadata = {
  title: "Quản lý đợt khám | VISI - CSR",
  description: "Danh sách đợt khám",
};

export default function Campaign() {
  return (
    <Box
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        p: { xs: 1, md: 3 },
      }}
    >
      <Card sx={{ boxShadow: 3, minHeight: "80vh" }}>
        <CardContent>{/* <TableEmployee /> */}</CardContent>
      </Card>
    </Box>
  );
}
