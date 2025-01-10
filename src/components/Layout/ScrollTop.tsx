"use client";
import { useState, useEffect } from "react";
import { Fab, Zoom, Tooltip } from "@mui/material";
import KeyboardDoubleArrowUpSharpIcon from "@mui/icons-material/KeyboardDoubleArrowUpSharp";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Kiểm tra vị trí cuộn để hiển thị hoặc ẩn nút
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Cuộn về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={visible}>
      <Tooltip title="Đến đầu trang" arrow>
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="medium"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 10,
            zIndex: 1000,
            boxShadow: 10,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          <KeyboardDoubleArrowUpSharpIcon
            sx={{
              animation: visible ? "bounce 1.5s infinite" : "none", // Hiệu ứng chuyển động nhẹ khi hiển thị
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-6px)" },
              },
            }}
          />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollTopButton;
