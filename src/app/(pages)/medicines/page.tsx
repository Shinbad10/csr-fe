import * as React from "react";
import Box from "@mui/material/Box";
import type { Metadata } from "next";
import TableMedicine from "../../../components/DataTable/Tables/MedicineTable";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const metadata: Metadata = {
  title: "Quản lý thuốc | VISI - CSR",
  description: "Danh mục thuốc",
};
export default function About() {
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
        <CardContent>
          <TableMedicine />
        </CardContent>
      </Card>
    </Box>
  );
}
