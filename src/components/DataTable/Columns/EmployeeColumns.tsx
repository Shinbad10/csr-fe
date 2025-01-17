import { GridColDef, GridRenderEditCellParams } from "@mui/x-data-grid";
import { Box, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EmployeeColumns: GridColDef[] = [
  {
    field: "MaNV",
    headerName: "ID",
    width: 10,
    sortable: false,
    hideSortIcons: true,
    resizable: false,
  },
  {
    field: "HoTenNV",
    headerName: "Họ và tên",
    minWidth: 150,
    editable: true,
  },
  {
    field: "NgaySinh",
    headerName: "Ngày sinh",
    minWidth: 150,
    editable: true,
    valueFormatter: (value: any) =>
      value ? dayjs(value).format("DD/MM/YYYY") : null,
    renderEditCell: (params: GridRenderEditCellParams) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <DatePicker
          format="DD-MM-YYYY"
          value={dayjs(params.value) || null}
          onChange={(newValue) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: newValue?.toDate(),
            });
          }}
        />
      </Box>
    ),
  },
  {
    field: "GioiTinh",
    headerName: "Giới tính",
    minWidth: 110,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => (
      <Select
        value={params.value || ""}
        onChange={(event) =>
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: event.target.value,
          })
        }
        fullWidth
      >
        <MenuItem value="Nam">Nam</MenuItem>
        <MenuItem value="Nữ">Nữ</MenuItem>
        <MenuItem value="Khác">Khác</MenuItem>
      </Select>
    ),
  },
  {
    field: "DienThoai",
    headerName: "Điện thoại",
    minWidth: 150,
    editable: true,
  },
  { field: "DiaChi", headerName: "Địa chỉ", minWidth: 200, editable: true },
  { field: "ChucVu", headerName: "Chức vụ", minWidth: 150, editable: true },
  {
    field: "ChucDanh",
    headerName: "Chức danh",
    minWidth: 150,
    editable: true,
  },
  {
    field: "Username",
    headerName: "Tài khoản",
    minWidth: 150,
    editable: true,
  },
  {
    field: "Password",
    headerName: "Mật khẩu",
    minWidth: 150,
    editable: true,
    renderCell: () => (
      <span style={{ fontFamily: "monospace" }}>{"•".repeat(6)} </span>
    ),
    renderEditCell: (params) => (
      <TextField
        type="password"
        value={""}
        onChange={(event) =>
          params.api.setEditCellValue(
            { id: params.id, field: params.field, value: event.target.value },
            event
          )
        }
        size="small"
      />
    ),
  },
];

export default EmployeeColumns;
