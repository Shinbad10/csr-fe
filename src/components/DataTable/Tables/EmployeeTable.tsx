"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "@/store/slices/appSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DataGrid,
  GridRowSelectionModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Typography, Box } from "@mui/material";
import { FileExcelOutlined, PrinterOutlined } from "@ant-design/icons";
import { EmployeeToolbar } from "@/components/DataTable/Toolbars";
import { EmployeeColumns } from "@/components/DataTable/Columns";
import Pagination from "@/components/DataTable/Pagination";

export default function EmployeeTable() {
  const [rowData, setRow] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false); // Thêm state loading
  const [editedRows, setEditedRows] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>(
    []
  );
  const apiRef = useGridApiRef();
  const dispatch = useDispatch();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/employees", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const rows = await response.json();
      setRow(rows.data.data); // Cập nhật lại state với dữ liệu mới
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessRowUpdateError = (error: any) => {
    dispatch(
      setNotification({
        open: true,
        message: `Cập nhật thất bại: ${error.message || "Lỗi không xác định"}`,
        severity: "error",
        vertical: "top",
        horizontal: "right",
      })
    );
  };

  const processRowUpdate = (newRow: any) => {
    const { MaNV } = newRow;
    const updatedRows = rowData.map((row: any) =>
      row.MaNV === MaNV ? { ...row, ...newRow } : row
    );
    setRow(updatedRows);
    setEditedRows((prevEdited) => {
      const alreadyEdited = prevEdited.some((row) => row.MaNV === MaNV);
      if (!alreadyEdited) {
        return [...prevEdited, newRow];
      }
      return prevEdited.map((row) =>
        row.MaNV === MaNV ? { ...row, ...newRow } : row
      );
    });
    return newRow;
  };

  const handleCancelChanges = () => {
    fetchData();
    setEditedRows([]); // Xóa danh sách các hàng đã chỉnh sửa
    dispatch(
      setNotification({
        open: true,
        message: "Các thay đổi đã được hủy.",
        severity: "info",
        vertical: "top",
        horizontal: "right",
      })
    );
  };

  const handleSaveChanges = () => {
    if (editedRows.length > 0) {
      const validChanges = editedRows.some((row) =>
        Object.values(row).some((value) => value?.toString().trim() !== "")
      );
      if (validChanges) {
        editedRows.map(async (updatedRow) => {
          setLoading(true);
          try {
            await fetch("/api/employees/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ updatedRow }),
            });
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        });
        dispatch(
          setNotification({
            open: true,
            message: "Các thay đổi đã được lưu thành công.",
            severity: "success",
            vertical: "top",
            horizontal: "right",
          })
        );
        setEditedRows([]); // Sau khi lưu xong
      } else {
        dispatch(
          setNotification({
            open: true,
            message: "Không có thay đổi hợp lệ để lưu.",
            severity: "info",
            vertical: "top",
            horizontal: "right",
          })
        );
      }
    }
  };

  const handleAddRow = () => {
    setLoading(true);
    const newRow = {
      id: rowData.length + 1,
      MaNV: rowData.length + 1,
      HoTenNV: `NV${(rowData.length + 1).toString().padStart(3, "0")}`,
      NgaySinh: new Date("1999-01-01"),
      GioiTinh: "Nam",
      DienThoai: null,
      DiaChi: null,
      ChucVu: "Nhân viên",
      ChucDanh: null,
      Username: `NV${(rowData.length + 1).toString().padStart(3, "0")}`,
    };

    // Gửi yêu cầu API thêm hàng mới
    fetch("/api/employees/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newRow }),
    })
      .then((response) => response.json())
      .then(async () => {
        // Sau khi thêm thành công, gọi lại fetchData để làm mới dữ liệu
        await fetchData(); // Lấy lại dữ liệu từ server để đảm bảo dữ liệu nhất quán
        setLoading(false);
      })
      .catch((error) => {
        console.error("Có lỗi khi thêm nhân viên:", error);
        setLoading(false);
        dispatch(
          setNotification({
            open: true,
            message: "Lỗi khi thêm nhân viên.",
            severity: "error",
            vertical: "top",
            horizontal: "right",
          })
        );
      });
  };
  const handleDeleteRows = async () => {
    if (selectedRows.length > 0) {
      setLoading(true);
      try {
        await fetch("/api/employees/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedRows }),
        });
        fetchData();
        dispatch(
          setNotification({
            open: true,
            message: "Xóa thành công.",
            severity: "success",
            vertical: "top",
            horizontal: "right",
          })
        );
        setSelectedRows([]); // Clear selected rows
      } catch (error) {
        console.error("Error deleting rows:", error);
        dispatch(
          setNotification({
            open: true,
            message: "Có lỗi khi xóa các hàng đã chọn.",
            severity: "error",
            vertical: "top",
            horizontal: "right",
          })
        );
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(
        setNotification({
          open: true,
          message: "Vui lòng chọn ít nhất một hàng để xóa.",
          severity: "info",
          vertical: "top",
          horizontal: "right",
        })
      );
    }
  };
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });
  React.useEffect(() => {
    fetchData(); // Gọi fetchData để lấy dữ liệu ban đầu
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DataGrid
          rows={rowData}
          columns={EmployeeColumns}
          apiRef={apiRef}
          density="compact"
          getRowId={(row) => row.MaNV}
          pageSizeOptions={[5, 10, 15, 100, { value: -1, label: "Tất cả" }]}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          disableColumnMenu
          checkboxSelection
          loading={loading}
          paginationModel={paginationModel}
          onRowSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
          onPaginationModelChange={setPaginationModel}
          hideFooterSelectedRowCount
          sx={{
            flexGrow: 1,
            height: "calc(100% - 100px)",
            border: "1px solid #ddd",
          }}
          slots={{
            toolbar: () => (
              <EmployeeToolbar
                handleAddRow={handleAddRow}
                handleSaveChanges={handleSaveChanges}
                handleCancelChanges={handleCancelChanges}
                handleDeleteRows={handleDeleteRows}
                hasSelected={selectedRows.length > 0}
                editedRows={editedRows}
              />
            ),
            noRowsOverlay: () => <Typography>Không có dữ liệu</Typography>,
            pagination: Pagination,
          }}
          localeText={{
            toolbarColumns: "Ẩn/Hiện",
            columnsManagementShowHideAllText: "Ẩn/Hiện tất cả",
            columnsManagementReset: "huỷ",
            toolbarQuickFilterPlaceholder: "Nhập thông tin tìm kiếm",
            toolbarExport: "Xuất dữ liệu",
            checkboxSelectionHeaderName: "Chọn",

            toolbarExportPrint: (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PrinterOutlined />
                In
              </Box>
            ),
            MuiTablePagination: {
              labelRowsPerPage: "Số dòng hiển thị",
            },
            toolbarExportCSV: (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FileExcelOutlined />
                Xuất file CSV
              </Box>
            ),
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
