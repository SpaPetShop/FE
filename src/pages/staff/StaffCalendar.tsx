import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
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
  Card,
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
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [orderDetail, setOrderDetail] = useState<any>();
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  const handleSearchName = (name: string) => {
    setSearchName(name);
  };

  const handleSearchPhone = (phone: string) => {
    setSearchPhone(phone);
  };

  const handleApprove = () => {
    updateTaskStatus("ACCEPT");
  };

  const handleProcess = () => {
    updateTaskStatus("PROCESS");
  };

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await StaffAPI.getAll({
        accountId: userData?.id,
      });
      setTasks(data);
      console.log(data);
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
      await StaffAPI.updateTask(selectedTask.id, {
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
  const renderTaskatus = (status: string) => {
    switch (status) {
      case "ACCEPT":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Nhận Công Việc"}
            color="warning"
            size="small"
          />
        );
      case "COMPLETED":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đã Hoàn Thành"}
            color="success"
            size="small"
          />
        );
      case "PROCESS":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đang xử lý"}
            color="info"
            size="small"
          />
        );
      case "CANCELED":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đã Hủy"}
            color="error"
            size="small"
          />
        );
      case "PENDING":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đang chờ "}
            color="secondary"
            size="small"
          />
        );
    }
  };
  const renderStatusOrder = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đã Thanh Toán"}
            color="warning"
            size="small"
          />
        );
      case "COMPLETED":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đã Hoàn Thành"}
            color="success"
            size="small"
          />
        );
      case "PROCESS":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đang xử lý"}
            color="info"
            size="small"
          />
        );
      case "CANCELED":
        return (
          <Chip
            sx={{ minWidth: 120 }}
            label={"Đã Hủy"}
            color="error"
            size="small"
          />
        );
    }
  };

  const fetchOrderDetail = async (orderId: string) => {
    try {
      setIsLoading(true);
      const response: any = await StaffAPI.getOrderDetail(orderId);
      setOrderDetail(response);
      console.log("orderDetail", response);
    } catch (error) {
      console.log("Error fetching order details: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    if (!orderId) return;

    try {
      setIsLoading(true);
      await StaffAPI.update(orderId, {
        status: status,
        excutionDate: new Date().toISOString(),
      });

      setSnackbarMessage("Đơn hàng đã được cập nhật thành công!");
      setSnackbarSeverity("success");
      fetchTasks();
      handleCloseDetail();
    } catch (error) {
      setSnackbarMessage("Lỗi khi cập nhật đơn hàng.");
      setSnackbarSeverity("error");
      console.log("Lỗi khi cập nhật đơn hàng: ", error);
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCompleteOrder = () => {
    if (selectedTask?.order?.id) {
      updateOrderStatus(selectedTask.order.id, "COMPLETED");
    }
  };

  const handleDetailClick = (task: any) => {
    setSelectedTask(task);
    if (task?.order?.id) {
      fetchOrderDetail(task.order.id);
    }
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
    setOrderDetail([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPagination((prev) => ({ ...prev, size: +event.target.value, page: 1 }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={3}
        sx={{ mb: 3, mt: 2 }}
      >
        {/* <TextField
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
        /> */}
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
              <StyledTableCell align="center">#</StyledTableCell>
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
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.pets.name || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.staff.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.createDate || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {task.excutionDate || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {renderTaskatus(task.status || "-")}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Button
                      variant="contained"
                      onClick={() => handleDetailClick(task)}
                    >
                      Chi tiết
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="center">
                  Không có dữ liệu
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.size}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

      {/* Task Detail Dialog */}
      <Dialog
        open={!!selectedTask}
        onClose={handleCloseDetail}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Chi tiết công việc</DialogTitle>
        <DialogContent>
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              <strong> Mã đơn hàng:</strong>{" "}
              {selectedTask?.order?.invoiceCode || "-"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Tên thú cưng:</strong> {selectedTask?.pets.name || "-"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong> Người phụ trách:</strong>{" "}
              {selectedTask?.staff.fullName || "-"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong> Ngày tạo:</strong> {selectedTask?.createDate || "-"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Ngày thực thi:</strong>{" "}
              {selectedTask?.excutionDate || "-"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Trạng thái:</strong>{" "}
              {renderTaskatus(selectedTask?.status || "-")}
            </Typography>
            {selectedTask?.status === "PENDING" ? (
              <Button
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  margin: "10px",
                }}
                onClick={handleApprove}
              >
                Nhận công việc
              </Button>
            ) : selectedTask?.status === "ACCEPT" ? (
              <Button
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  margin: "10px",
                }}
                onClick={handleProcess}
              >
                Tiến hành
              </Button>
            ) : null}
          </Card>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Chi tiết đơn hàng
              </Typography>
              {orderDetail ? (
                <Card sx={{ p: 2, mb: 2 }}>
                  <Grid container spacing={2}>
                    {/* Cột bên trái: Thông tin đơn hàng */}
                    <Grid item xs={12} md={8}>
                      <Typography variant="body1" gutterBottom>
                        <strong>Mã đơn hàng:</strong>{" "}
                        {orderDetail.invoiceCode || "-"}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>
                          {" "}
                          Giá đơn hàng:{" "}
                          {orderDetail.finalAmount?.toLocaleString() || "-"} VND
                        </strong>{" "}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Loại công việc:</strong>{" "}
                        {orderDetail.type || "-"}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Ngày tạo:</strong>{" "}
                        {new Date(orderDetail.createDate).toLocaleString() ||
                          "-"}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong> Ngày thực hiện:</strong>{" "}
                        {new Date(orderDetail.excutionDate).toLocaleString() ||
                          "-"}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Trạng thái:</strong>{" "}
                        {renderStatusOrder(orderDetail?.status || "")}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Ngày hoàn thành:</strong>{" "}
                        {orderDetail.completedDate
                          ? new Date(orderDetail.completedDate).toLocaleString()
                          : "-"}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Nhân viên phụ trách:</strong>{" "}
                        {orderDetail.staff?.fullName || "-"}
                      </Typography>
                    </Grid>

                    {/* Cột bên phải: Thông tin thú cưng */}
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" gutterBottom>
                        Thông tin thú cưng
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Tên:</strong>{" "}
                        {orderDetail.petInfor?.name || "-"}
                      </Typography>
                      {orderDetail.petInfor?.image && (
                        <Box sx={{ mt: 2, mb: 2 }}>
                          <img
                            src={orderDetail.petInfor.image}
                            alt={`Ảnh của ${
                              orderDetail.petInfor?.name || "thú cưng"
                            }`}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                              e.currentTarget.alt = "Ảnh không khả dụng";
                            }}
                          />
                        </Box>
                      )}
                      <Typography variant="body1" gutterBottom>
                        <strong>Loại:</strong>{" "}
                        {orderDetail.petInfor?.typePet?.name || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <DialogContent>
                    {selectedTask?.status === "PROCESS" && (
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                        onClick={handleCompleteOrder}
                      >
                        Hoàn thành đơn hàng
                      </Button>
                    )}
                  </DialogContent>
                </Card>
              ) : (
                <Typography variant="body1">
                  Không có thông tin chi tiết.
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
