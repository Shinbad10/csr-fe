"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useColorScheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Avatar,
} from "@mui/material";

export default function LoginPage() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Remember, setRemember] = useState(false);
  const router = useRouter();
  const logo = "/images/logo/LogoIcon.png";
  const logoWhite = "/images/logo/LogoWhite.png";
  const { mode } = useColorScheme();
  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, Password, Remember }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); // Redirect to Home page after login
    }
  }, [isLoggedIn, router]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 3,
          borderRadius: 2,
          boxShadow: 5,
          backgroundColor: "Background",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          Welcome to <span style={{ color: "#3f51b5" }}>Visi CSR!</span>
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" mb={3}>
          Đăng nhập để khám phá các tính năng
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Avatar
            src={mode === "light" ? logo : logoWhite}
            alt="Avatar"
            variant="square"
            sx={{ width: "10rem", height: "auto" }}
          />
        </Box>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tài khoản"
          />

          {error && (
            <Box mb={2}>
              {error.Username?.map((msg: string, index: any) => (
                <Alert key={index} severity="error" sx={{ mb: 1 }}>
                  {msg}
                </Alert>
              ))}
            </Box>
          )}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
          {error && (
            <Box mb={2}>
              {error.Password?.map((msg: string, index: any) => (
                <Alert key={index} severity="error" sx={{ mb: 1 }}>
                  {msg}
                </Alert>
              ))}
            </Box>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={Remember}
                onChange={() => setRemember((prev) => !prev)}
                color="primary"
              />
            }
            label="Lưu đăng nhập"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Đăng nhập"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
