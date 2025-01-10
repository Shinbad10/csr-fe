"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ComputerIcon from "@mui/icons-material/Computer";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import { useColorScheme } from "@mui/material/styles";

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  const isDarkMode = mode === "dark";

  const handleToggle = () => {
    setMode(isDarkMode ? "light" : "dark");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip title="Light">
        <IconButton
          onClick={() => setMode("light")}
          color={mode === "light" ? "primary" : "default"}
        >
          <LightModeIcon />
        </IconButton>
      </Tooltip>
      <Switch
        checked={isDarkMode}
        onChange={handleToggle}
        name="themeModeSwitch"
      />
      <Tooltip title="Dark">
        <IconButton
          onClick={() => setMode("dark")}
          color={mode === "dark" ? "primary" : "default"}
        >
          <DarkModeIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
