import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import type { Metadata } from "next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export const metadata: Metadata = {
  title: "Quản lý đợt khám | VISI - CSR",
  description: "Phần mềm quản lý khám tầm soát cộng đồng",
};

export default function Campaign() {
  return (
    <Box
      sx={{
        height: "90vh", // Full screen height
        p: { xs: 1, md: 3 },
      }}
    >
      <Card sx={{ minWidth: 275, boxShadow: 3, height: "100%" }}>
        <CardContent>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
