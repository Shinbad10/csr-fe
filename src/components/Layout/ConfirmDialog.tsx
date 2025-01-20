import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

interface DeleteConfirmationDialogProps {
  openDialog: boolean;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  openDialog,
  handleDeleteCancel,
  handleDeleteConfirm,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={handleDeleteCancel}
      PaperProps={{
        style: {
          borderRadius: 16,
          padding: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff3e0", // Nền màu nhạt (vàng nhạt)
          padding: "16px",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <WarningIcon
          sx={{ color: "#ff9800", marginRight: "8px", fontSize: 32 }}
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: "1.25rem", // Chỉnh kích thước chữ
            textAlign: "center",
          }}
        >
          Xác nhận xóa
          <span
            style={{ fontSize: "0.875rem", color: "#888", marginLeft: "8px" }}
          >
            (Để xác nhận)
          </span>
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: "16px", textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            marginBottom: "16px",
            fontSize: "16px",
            lineHeight: 1.5,
          }}
        >
          Bạn có chắc chắn muốn xóa các hàng đã chọn không? Hành động này không
          thể hoàn tác.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Button
          onClick={handleDeleteCancel}
          variant="outlined"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: 8,
            padding: "8px 24px",
            fontWeight: "bold",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleDeleteConfirm}
          variant="contained"
          color="error"
          sx={{
            textTransform: "none",
            marginLeft: "8px",
            borderRadius: 8,
            padding: "8px 24px",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0px 4px 12px rgba(255, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
