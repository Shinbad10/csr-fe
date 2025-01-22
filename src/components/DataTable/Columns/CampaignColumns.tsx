import {
  GridColDef,
  GridRenderEditCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const CampaignColumns: GridColDef[] = [
  {
    field: "ID",
    headerName: "STT",
    width: 50,
    sortable: false,
    hideSortIcons: true,
    resizable: false,
  },

  {
    field: "TenDotKham",
    headerName: "Tên đợt khám",
    minWidth: 150,
  },
  {
    field: "MaDotKham",
    headerName: "Mã đợt khám",
    minWidth: 150,
  },
  {
    field: "TrangThai",
    headerName: "Trạng Thái",
    minWidth: 110,
    renderCell: (params) => {
      return <>{params.row.TrangThai}</>;
    },
  },
  {
    field: "TruongDoan",
    headerName: "Người tạo",
    minWidth: 200,
    renderCell: (params) => {
      const ngayTaoFormatted = dayjs(params.row.NgayTao).format(
        "DD/MM/YYYY HH:mm"
      );
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {params.row.TruongDoanHoTen}
          {ngayTaoFormatted}
        </Box>
      );
    },
  },
  {
    field: "ThanhVien",
    headerName: "Thành viên",
    minWidth: 100,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "primary.main",
          }}
          // onClick={() => handleCellClick(params)} // Handle click
        >
          {params.row.ThanhVien.length}
        </Box>
      );
    },
  },

  {
    field: "SLBN",
    headerName: "SLBN",
    minWidth: 100,
    renderCell: (params) => {
      return params.row.BenhNhan.length;
    },
  },
  {
    field: "DiaDiem",
    headerName: "Địa điểm",
    minWidth: 350,
  },
  { field: "SLMo", headerName: "SL Mổ", minWidth: 100 },
  {
    field: "ThoiGian",
    headerName: "Thời gian",
    minWidth: 200,
    renderCell: (params) => {
      const ngayBatDauFormatted = dayjs(params.row.NgayBatDau).format(
        "DD/MM/YYYY"
      );
      const ngayKetThucFormatted = dayjs(params.row.NgayKetThuc).format(
        "DD/MM/YYYY"
      );

      return (
        <>
          {ngayBatDauFormatted} - {ngayKetThucFormatted}
        </>
      );
    },
  },
];

export default CampaignColumns;
