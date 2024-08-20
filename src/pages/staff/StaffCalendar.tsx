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
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import StaffAPI from "../../utils/StaffAPI";
import { PaginationType } from "../../types/CommonType";

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
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  const handleSearchName = (name: string) => {
    setSearchName(name);
  };

  const handleSearchPhone = (phone: string) => {
    setSearchPhone(phone);
  };

  const handleApprove = () => {
    updateTaskStatus("COMPLETED");
  };

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await StaffAPI.getAll({
        accountId: userData?.id,
      });
      setTasks(data);
      console.log(data)
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
  }, [userData?.id, pagination.page, pagination.size, searchName, searchPhone]);

  const updateTaskStatus = async (status: string) => {
    if (!selectedTask) return;

    try {
      setIsLoading(true);
      await StaffAPI.update(selectedTask.id, {
        accountId: userData?.id,
        excutionDate: new Date().toISOString(), 
        status,
      });

      setSnackbarMessage("Task status updated successfully!");
      setSnackbarSeverity("success");
      fetchTasks();
      handleCloseDetail();
    } catch (error) {
      setSnackbarMessage("Error updating task status.");
      setSnackbarSeverity("error");
      console.log("Error updating task status: ", error);
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction={"row"} alignItems={"center"} spacing={3} sx={{ mb: 3, mt: 2 }}>
        <TextField
          size="small"
          placeholder="Nhập mã đơn hàng..."
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
              <MenuItem value={"PENDING"}>Đang Chờ</MenuItem>
              <MenuItem value={"PROCESS"}>Xử Lý</MenuItem>
              <MenuItem value={"COMPLETED"}>Hoàn Thành</MenuItem>
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
                      <Chip label={"Đang xử lý"} color="info" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetailClick(task)}
                    >
                      Xem chi tiết
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="center">
                  <Typography variant="body2">Không có dữ liệu</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.size}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={!!selectedTask} onClose={handleCloseDetail}>
        <DialogTitle>Chi tiết công việc</DialogTitle>
        <DialogContent>
        
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => updateTaskStatus("COMPLETED")} color="primary">
            Hoàn thành
          </Button>
          <Button onClick={() => updateTaskStatus("PENDING")} color="secondary">
            Đặt lại
          </Button>
          <Button onClick={handleCloseDetail}>Đóng</Button>
        </DialogActions> */}
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography> <strong>Mã hóa đơn:</strong> {selectedTask.order.invoiceCode}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Tổng tiền:</strong> {selectedTask.order.finalAmount}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Ngày tạo:</strong> {selectedTask.createDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Ngày thực thi:</strong> {selectedTask.excutionDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Trạng thái:</strong> {selectedTask.status}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Nhân viên phụ trách:</strong> {selectedTask.staff.fullName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Tên thú cưng:</strong> {selectedTask.pets.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Loại thú cưng:</strong> {selectedTask.pets.typePet}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Ảnh: {selectedTask.pets.image}</Typography>
              </Grid>
            </Grid>
          
            <div style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
            <Button style={{backgroundColor:'green', color:'white'}} onClick={() => updateTaskStatus("PROCESS")} >
            Hoàn thành
          </Button>
             
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
    
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
