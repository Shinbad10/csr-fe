"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "@/store/slices/appSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DataGrid,
  GridFilterModel,
  GridRowSelectionModel,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Typography, Box } from "@mui/material";
import { FileExcelOutlined, PrinterOutlined } from "@ant-design/icons";
import { EmployeeToolbar } from "@/components/DataTable/Toolbars";
import { CampaignColumns } from "@/components/DataTable/Columns";
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
      const response = await fetch("/api/campaigns", {
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
          columns={CampaignColumns}
          apiRef={apiRef}
          density="compact"
          getRowId={(row) => row.ID}
          disableColumnMenu
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          hideFooterSelectedRowCount
          disableRowSelectionOnClick
          disableColumnSelector
          sx={{
            flexGrow: 1,
            minHeight: "78vh",
            border: "1px solid #ddd",
            "@media print": {
              ".MuiDataGrid-main": { color: "rgba(0, 0, 0, 0.87)" },
            },
          }}
          slots={{
            toolbar: () => <GridToolbar />,
            noRowsOverlay: () => (
              <Typography
                sx={{
                  textAlign: "center",
                  padding: 4,
                }}
              >
                Không có dữ liệu!
              </Typography>
            ),
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
