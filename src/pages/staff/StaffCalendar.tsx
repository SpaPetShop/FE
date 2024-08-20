import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TablePagination,
  TextField,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PaginationType } from "../../types/CommonType";
import StaffAPI from "../../utils/StaffAPI";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f4511e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "#81d4fa",
  },
}));

export const StaffCalendar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    size: 10,
    total: 10,
    totalPages: 1,
  });
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const handleSearchName = (name: string) => {
    setSearchName(name);
  };

  const handleSearchPhone = (phone: string) => {
    setSearchPhone(phone);
  };

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await StaffAPI.getAll({
        accountId: userData?.id,
       
      });

      setTasks(data);
      setPagination({
        page: data.page,
        size: data.size,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log("Error getting tasks: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.size, searchName, searchPhone]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDetailClick = (task: any) => {
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => ({ ...prev, size: +event.target.value, page: 1 }));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction={"row"} alignItems={"center"} spacing={3} sx={{ mb: 3, mt: 2 }}>
        <TextField
          size="small"
          placeholder="Nhập tên khách hàng..."
          label="Tìm kiếm"
          value={searchName}
          onChange={(e) => handleSearchName(e.target.value)}
          sx={{ width: "300px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          size="small"
          placeholder="Nhập số điện thoại..."
          label="Tìm kiếm"
          value={searchPhone}
          onChange={(e) => handleSearchPhone(e.target.value)}
          sx={{ width: "300px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: "300px" }} size="small">
            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Trạng thái"
              onChange={(e) => console.log(e.target.value)}
            >
              <MenuItem value={""}>Tất cả</MenuItem>
              <MenuItem value={"Activate"}>Đang hoạt động</MenuItem>
              <MenuItem value={"Deactivate"}>Ngưng hoạt động</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Mã hóa đơn</StyledTableCell>
              <StyledTableCell align="center">Tên thú cưng</StyledTableCell>
              <StyledTableCell align="center">Người phụ trách</StyledTableCell>
              <StyledTableCell align="center">Ngày tạo</StyledTableCell>
              <StyledTableCell align="center">Ngày thực thi</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <StyledTableRow hover={true} key={index}>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : tasks.length > 0 ? (
              tasks.map((task, index) => (
                <StyledTableRow key={task.id}>
                  <StyledTableCell align="center" size="small">
                    {(pagination.page - 1) * pagination.size + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.order.invoiceCode}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.pets.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.staff.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.createDate}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.excutionDate}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.status === "PENDING" ? (
                      <Chip label={"Chờ thực thi"} color="warning" />
                    ) : task.status === "COMPLETED" ? (
                      <Chip label={"Hoàn thành"} color="success" />
                    ) : (
                      <Chip label={"Đã hủy"} color="error" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetailClick(task)}
                    >
                      Detail
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="center">
                  <Typography align="center">Không có dữ liệu!</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.size}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={Boolean(selectedTask)}
        onClose={handleCloseDetail}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {selectedTask ? (
            <Stack spacing={2}>
              <Typography>Mã hóa đơn: {selectedTask.order.invoiceCode}</Typography>
              <Typography>Thú cưng: {selectedTask.pets.name}</Typography>
              <Typography>Nhân viên phụ trách: {selectedTask.staff.fullName}</Typography>
              <Typography>Ngày tạo: {selectedTask.createDate}</Typography>
              <Typography>Ngày thực thi: {selectedTask.excutionDate}</Typography>
              <Typography>Trạng thái: {selectedTask.status}</Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
              <Button style={{backgroundColor:'green', color:'white', marginRight:'10px'}}>Approve</Button>
            <Button style={{backgroundColor:'red', color:'white'}}>Reject</Button>

              </div>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
