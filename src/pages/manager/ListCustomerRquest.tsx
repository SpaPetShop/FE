import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hook/useDebounce";
import {
  FilterCustomerRequestType,
  CustomerRequestType,
} from "../../types/CustomerRequest/CustomerRequestType";
import { UserType } from "../../types/User/UserType";
import CustomerRequestAPI from "../../utils/CustomerRequestAPI";
import UserAPI from "../../utils/UserAPI";
import { PaginationType } from "../../types/CommonType";
import MenuActionCustomerRequest from "../../components/manager/MenuAction/MenuActionCustomerRequest";
import ModalConfirmCustomerRequest from "../../components/manager/Modal/CustomerRequest/ModalConfirmRequest";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#81d4fa",
  },
}));

export const renderStatusCustomerRequest = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <Chip
          sx={{ minWidth: 120 }}
          label={"Đang chờ"}
          color="warning"
          size="small"
        />
      );
    case "ACCEPT":
      return (
        <Chip
          sx={{ minWidth: 120 }}
          label={"Đang xử lí"}
          color="info"
          size="small"
        />
      );
    case "REJECT":
      return (
        <Chip
          sx={{ minWidth: 120 }}
          label={"Hoàn Thành"}
          color="success"
          size="small"
        />
      );
  }
};
export default function ListCustomerRequest() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [typeAction, setTypeAction] = React.useState(true);
  const [selectedRequest, setSelectedRequest] =
    React.useState<CustomerRequestType | null>(null);
  const [listCustomerRequest, setListCustomerRequest] = React.useState<
    CustomerRequestType[] | []
  >([]);
  const [pagination, setPagination] = React.useState<PaginationType>({
    page: 1,
    size: 10,
    total: 10,
    totalPages: 1,
  });
  const [searchName, setSearchName] = React.useState("");
  const [filter, setFilter] = React.useState<FilterCustomerRequestType>({
    page: 1,
    size: 10,
  });
  const [searchCreateDate, setSearchCreateDate] = React.useState("");
  const debouncedInputValueName = useDebounce(searchName, 500); // Debounce with 500ms delay
  const debouncedInputValueDate = useDebounce(searchCreateDate, 500); // Debounce with 500ms delay
  const handleChangePage = (event: unknown, newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({ ...prev, page: 1, size: +event.target.value }));
  };
  const handleSearchCreateDate = (date: string) => {
    setSearchCreateDate(date ? moment(date).format("YYYY-MM-DD") : "");
  };
  const fetchAllCustomerRequest = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await CustomerRequestAPI.getAll(filter);
      console.log({ data });
      setListCustomerRequest(data.items);
      setPagination({
        page: 1,
        size: 10,
        total: 10,
        totalPages: 10,
      });
    } catch (error) {
      console.log("Error get list User: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);
  React.useEffect(() => {
    fetchAllCustomerRequest();
  }, [fetchAllCustomerRequest]);

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, AccountId: debouncedInputValueName }));
  }, [debouncedInputValueName]);

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, ExctionDate: debouncedInputValueDate }));
  }, [debouncedInputValueDate]);
  console.log({ typeAction });

  return (
    <Paper sx={{ p: 3, minHeight: "85vh" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={3}
        sx={{ mb: 3, mt: 2 }}
      >
        {/* 
        <TextField
          label="Tìm kiếm theo tên người dùng"
          value={searchName}
          sx={{ width: "300px" }}
          size="small"
          onChange={(e)=>setSearchName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{           
            autoComplete: "off", // disable autocomplete and autofill
          }}
        /> */}
        <TextField
          size="small"
          placeholder="Nhập ngày thực thi..."
          label="Ngày thực thi"
          type="date"
          value={searchCreateDate}
          onChange={(e) => handleSearchCreateDate(e.target.value)}
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
              value={filter.Status}
              label="Trạng thái"
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  Status: e.target.value as string,
                }))
              }
            >
              <MenuItem value={""}>Tất cả</MenuItem>
              <MenuItem value={"PENDING"}>Đang chờ</MenuItem>
              <MenuItem value={"ACCEPT"}>Đã chấp nhận</MenuItem>
              <MenuItem value={"REJECT"}>Đã từ chối</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Tên Khách Hàng</StyledTableCell>
              <StyledTableCell align="center">Ngày Tạo</StyledTableCell>
              <StyledTableCell align="center">Ngày Thực Thi</StyledTableCell>
              <StyledTableCell align="center">Ghi Chú</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Hóa Đơn</StyledTableCell>
              <StyledTableCell align="center">Thao Tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCustomerRequest.length === 0 && isLoading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="left">
                  <Typography align="center">Không có dữ liệu!</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {isLoading &&
              Array.from({ length: 10 }).map((data, index) => (
                <StyledTableRow hover={true} key={index}>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {listCustomerRequest.length > 0 &&
              isLoading === false &&
              listCustomerRequest.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" size="small">
                    {(pagination.page - 1) * pagination.size + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {row.userId.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {row.createDate
                      ? moment(row.createDate).format("DD/MM/YYYY - HH:mm")
                      : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {row.exctionDate
                      ? moment(row.exctionDate).format("DD/MM/YYYY - HH:mm")
                      : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {row.note || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {renderStatusCustomerRequest(row.status)}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Tooltip
                      title={"Xem chi tiết"}
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/manager-manage-order/${row.orderId}`)
                      }
                    >
                      <VisibilityOutlinedIcon color="success" />
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <MenuActionCustomerRequest
                      setOpenConfirm={setOpen}
                      setSelectedRequest={setSelectedRequest}
                      data={row}
                      setTypeAction={setTypeAction}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
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
        labelRowsPerPage="Hàng trên trang"
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}–${to} / ${count !== -1 ? count : `nhiều hơn ${to}`}`;
        }}
      />
      {selectedRequest && (
        <ModalConfirmCustomerRequest
          data={selectedRequest}
          open={open}
          setOpen={setOpen}
          fetchCustomerRequest={fetchAllCustomerRequest}
          type={typeAction}
        />
      )}
    </Paper>
  );
}
