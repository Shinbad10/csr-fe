"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { RemoveRedEye as Eye } from "@mui/icons-material";
import { Divider } from "@mui/material";
import ModeSwitch from "../ModeSwitch";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";

const pages = [
  { name: "Đợt khám", path: "/campaigns" },
  { name: "Nhân viên", path: "/employees" },
  { name: "Bệnh nhân", path: "/patients" },
  { name: "Thuốc", path: "/medicines" },
];
const settings = [
  { name: "Thông tin tài khoản", path: "/profiles" },
  { name: "Đổi mật khẩu", path: "/change-password" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();

  const dispatch = useDispatch();

  const user = JSON.parse(Cookies.get("user") as any);
  dispatch(setUser(user));

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/");
    }
  };
  return (
    <AppBar position="sticky">
      <Box
        sx={{
          mx: { xs: 0.5, md: 4 },
        }}
      >
        <Toolbar disableGutters>
          <Eye sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: "lg",
            }}
          >
            VISI - MẮT SÁNG CỘNG ĐỒNG
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 2,
              my: 1,
              display: { xs: "none", md: "flex" },
              backgroundColor: "#eee",
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => {
                const isActive = usePathname() === page.path;
                return (
                  <MenuItem
                    key={page.name}
                    sx={{
                      backgroundColor: isActive ? "secondary.main" : "default",
                      color: isActive ? "primary.main" : "default",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                    onClick={() => {
                      router.push(page.path); // Chuyển trang bằng router.push
                      handleCloseNavMenu(); // Đóng menu sau khi chuyển
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Eye sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VISI - MẮT SÁNG CỘNG ĐỒNG
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: 4 } }}
          >
            {pages.map((page) => {
              const isActive = usePathname() === page.path;
              return (
                <Button
                  key={page.name}
                  onClick={() => {
                    router.push(page.path);
                  }}
                  sx={{
                    backgroundColor: isActive ? "secondary.main" : "default",
                    color: isActive ? "primary.main" : "white",
                    display: "block",
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Typography variant="body1" fontStyle="italic">
                    Xin chào!
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {user?.HoTenNV}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  {user?.ChucVu} {user?.ChucDanh}
                </Typography>
              </Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.HoTenNV} />
              </IconButton>
            </Box>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    md: "none",
                  },
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Typography variant="body1" fontStyle="italic">
                    Xin chào!
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {user?.HoTenNV}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  {user?.ChucVu} {user?.ChucDanh}
                </Typography>
              </Box>
              <ModeSwitch />
              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  mx: 2,
                  display: "flex",
                }}
              />
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "center" }}
                    onClick={() => {
                      router.push(setting.path); // Chuyển trang bằng router.push
                      handleCloseNavMenu(); // Đóng menu sau khi chuyển
                    }}
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: "center" }}>Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
