import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { East, LastPage, West, FirstPage } from "@mui/icons-material";
import {
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
  selectedGridRowsCountSelector,
} from "@mui/x-data-grid";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);
  const rowSelected = useGridSelector(apiRef, selectedGridRowsCountSelector);

  const [inputPage, setInputPage] = useState<number>(page + 1);

  // Sync `inputPage` with the current `page`
  useEffect(() => {
    setInputPage(page + 1);
  }, [page]);

  // Handle page input change
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    // Only allow numeric values
    if (/^\d*$/.test(value)) {
      setInputPage(value);

      // Update page directly if value is within range
      const pageNumber = Math.min(
        Math.max(parseInt(value.toString() || "1", 10), 1),
        pageCount
      );
      if (parseInt(value, 10) !== pageNumber) {
        setInputPage(pageNumber); // Correct the page number if out of range
      }
      apiRef.current.setPage(pageNumber - 1); // Update the page in DataGrid
    }
  };

  // Handle navigation buttons
  const handleGoFirstPage = () => {
    apiRef.current.setPage(0);
  };

  const handleGoLastPage = () => {
    apiRef.current.setPage(pageCount - 1);
  };

  const handleIncrement = () => {
    if (page + 1 < pageCount) {
      apiRef.current.setPage(page + 1);
    }
  };

  const handleDecrement = () => {
    if (page > 0) {
      apiRef.current.setPage(page - 1);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (event: any) => {
    const newPageSize = parseInt(event.target.value, 10);
    apiRef.current.setPageSize(newPageSize); // Update page size
    apiRef.current.setPage(0); // Reset to first page to prevent invalid page index
  };

  return (
    <Box
      sx={{
        display: { md: "flex", xs: "block" },
        width: "100%",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        px={2}
        sx={{
          position: { xs: "unset", md: "absolute" },
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {rowSelected > 0
            ? `Đã chọn: ${rowSelected} dòng`
            : "Không có dòng nào được chọn"}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        gap={1}
        sx={(theme) => ({ padding: theme.spacing(1.5, 0) })}
      >
        {/* Decrement Page Button */}
        <IconButton
          onClick={handleGoFirstPage}
          disabled={page <= 0}
          size="medium"
          sx={{ padding: 0 }}
        >
          <FirstPage fontSize="medium" />
        </IconButton>

        <IconButton
          onClick={handleDecrement}
          disabled={page <= 0}
          size="medium"
          sx={{ padding: 0 }}
        >
          <West fontSize="medium" />
        </IconButton>

        {/* Input for Direct Page Jump */}
        <TextField
          value={inputPage}
          onChange={handleInputChange} // Directly handle change
          size="small"
          type="number" // Only numeric input
          inputProps={{
            style: { textAlign: "center" }, // Căn chữ ngang
            maxLength: `${pageCount}`.length,
          }}
          sx={{
            width: 50,
            display: "flex",
            justifyContent: "center",
            "& .MuiInputBase-input": {
              textAlign: "center",
              padding: "6px 0",
            },
          }}
        />

        <IconButton
          onClick={handleIncrement}
          disabled={page + 1 >= pageCount}
          size="medium"
          sx={{ padding: 0 }}
        >
          <East fontSize="medium" />
        </IconButton>

        <IconButton
          onClick={handleGoLastPage}
          disabled={page + 1 >= pageCount}
          size="small"
          sx={{ padding: 0 }}
        >
          <LastPage fontSize="medium" />
        </IconButton>

        {/* Rows Per Page Dropdown */}
        <FormControl size="small" sx={{ minWidth: 100, textAlign: "center" }}>
          <InputLabel id="rows-per-page-label">Số dòng/trang</InputLabel>
          <Select
            labelId="rows-per-page-label"
            value={pageSize}
            onChange={handlePageSizeChange}
            label="Số kết quả/trang"
          >
            {[5, 10, 15].map((size) => (
              <MenuItem
                key={size}
                value={size}
                sx={{
                  justifyContent: "center", // Centers the text horizontally
                }}
              >
                {size}
              </MenuItem>
            ))}
            <MenuItem
              value={-1}
              sx={{
                justifyContent: "center", // Centers the text horizontally
              }}
            >
              Tất cả
            </MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1">Tổng {rowCount} dòng</Typography>
      </Box>
    </Box>
  );
}

export default CustomPagination;
