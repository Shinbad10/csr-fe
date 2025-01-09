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
import { useRouter } from "next/navigation";


const pages = [
  "Đợt khám",
  "Nhân viên",
  "Bệnh nhân",
  "Thuốc",
];
const settings = ["Thông tin tài khoản"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();

  const dispatch = useDispatch()

  const user = JSON.parse(Cookies.get('user') as any)
  dispatch(setUser(user))
  
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
 const handleLogout = async () =>{
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if(res.ok){
    router.push("/")
  }
 }
  return (
    <AppBar position="static">
      <Box
        sx={{
          mx: {xs:0.5,md:4},
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
              mx: 2, // Adjust spacing between elements
              my: 1, // Adjust spacing between elements
              display: { xs: "none", md: "flex" }, // Hide for smaller screens if needed
              backgroundColor: "#eee", // Set the color of the divider
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{
              display:'flex',
              alignItems:'center',
              gap:2
            }}>
              <Box sx={{
                display:{xs:'none',md:'block'}
              }}>
                <Box sx={{
                  display:'flex',
                  alignItems:'center',
                  gap:0.5
                }}>
                  <Typography variant="body1" fontStyle='italic'>Xin chào!</Typography>
                  <Typography variant="body1" fontWeight='bold' >{user?.HoTenNV}</Typography>
                </Box>
                  <Typography variant="body1" fontWeight='bold' fontStyle='italic'>{user?.ChucVu} {user?.ChucDanh}</Typography>
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
              <Box sx={{
                display:{xs:'flex',flexDirection:'column',textAlign:'center',md:'none'}
              }}>
              <Box sx={{
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  gap:0.5
                }}>
                  <Typography variant="body1" fontStyle='italic'>Xin chào!</Typography>
                  <Typography variant="body1" fontWeight='bold' >{user?.HoTenNV}</Typography>
                </Box>
                  <Typography variant="body1" fontWeight='bold' >{user?.ChucVu} {user?.ChucDanh}</Typography>
              </Box>
              <ModeSwitch />
              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  mx: 2, // Adjust spacing between elements
                  display: "flex", // Hide for smaller screens if needed
                }}
              />
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>
                    Đăng xuất
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
