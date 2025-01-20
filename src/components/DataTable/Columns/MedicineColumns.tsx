import { GridColDef } from "@mui/x-data-grid";

const MedicineColumns: GridColDef[] = [
  {
    field: "MaThuoc",
    headerName: "ID",
    width: 10,
    sortable: false,
    hideSortIcons: true,
    resizable: false,
  },
  {
    field: "TenThuoc",
    headerName: "Tên Thuốc",
    minWidth: 150,
    editable: true,
  },
  {
    field: "DVT",
    headerName: "Đơn vị tính",
    minWidth: 150,
    editable: true,
  },
  {
    field: "CachDung",
    headerName: "Cách dùng",
    minWidth: 150,
    editable: true,
  },
  {
    field: "DuongDung",
    headerName: "Đường dùng",
    minWidth: 150,
    editable: true,
  },
  {
    field: "DVSD",
    headerName: "Đơn vị sử dụng",
    minWidth: 150,
    editable: true,
  },
];

export default MedicineColumns;
