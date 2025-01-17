import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  CloseOutlined,
  DeleteFilled,
  PlusCircleFilled,
  SaveOutlined,
} from "@ant-design/icons";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface CustomToolbarProps {
  handleAddRow: () => void;
  handleSaveChanges: () => void;
  handleDeleteRows: () => void;
  editedRows: any[];
  handleCancelChanges: () => void;
  hasSelected: boolean;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  handleAddRow,
  handleSaveChanges,
  handleCancelChanges,
  handleDeleteRows,
  hasSelected,
  editedRows,
}) => {
  const [openDialog, setOpenDialog] = React.useState(false); // State to control dialog visibility
  const hasValidChanges = editedRows.some((row) =>
    Object.values(row).some((value) => value?.toString().trim() !== "")
  );

  const handleDeleteConfirm = () => {
    setOpenDialog(false); // Close the dialog
    handleDeleteRows(); // Proceed with deletion
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false); // Close the dialog
  };

  const openDeleteDialog = () => {
    setOpenDialog(true); // Open the dialog when delete button is clicked
  };

  return (
    <>
      <GridToolbarContainer
        sx={{
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GridToolbarColumnsButton />
          <GridToolbarQuickFilter />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddRow}
            size="small"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              title="Thêm"
              sx={{
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Thêm
            </Typography>
            <PlusCircleFilled />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {hasSelected && (
            <Button
              variant="outlined"
              color="error"
              onClick={openDeleteDialog}
              size="small"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body1" title="Xóa">
                Xóa
              </Typography>
              <DeleteFilled />
            </Button>
          )}
          {hasValidChanges && (
            <>
              <Button
                variant="outlined"
                color="success"
                onClick={handleSaveChanges}
                size="small"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  title="Lưu"
                  sx={{
                    color: "success",
                    textAlign: "center",
                  }}
                >
                  Lưu
                </Typography>
                <SaveOutlined />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelChanges}
                size="small"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  title="Hủy"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Hủy
                </Typography>
                <CloseOutlined />
              </Button>
            </>
          )}
          <GridToolbarExport
            csvOptions={{
              utf8WithBom: true, // Thêm tùy chọn này để xuất với mã hóa UTF-8 có BOM
            }}
          />
        </Box>
      </GridToolbarContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Bạn có chắc chắn muốn xóa các hàng đã chọn không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomToolbar;
